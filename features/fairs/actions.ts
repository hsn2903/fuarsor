"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import z from "zod";
import { Prisma } from "@/app/generated/prisma/client";

// Helper function to safely parse JSON from FormData
const parseJson = (value: any, fallback: any) => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }
  return fallback;
};

// --- 1. ZOD SCHEMA DEFINITION ---
const fairSchema = z.object({
  name: z.string().min(1, "Fuar adı zorunludur."),
  slug: z.string().min(1, "URL Slug zorunludur."),
  venue: z.string().optional(),
  website: z.string().optional(),

  // NEW FIELDS
  category: z.string().optional(),
  type: z.string().optional(),

  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Geçerli bir başlangıç tarihi giriniz.",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Geçerli bir bitiş tarihi giriniz.",
  }),

  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır."),
  summary: z.string().optional(),

  // Status & Booleans
  status: z.string().default("Beklemede"),
  isPublished: z.coerce.boolean(),
  isFeatured: z.coerce.boolean(),
  isSectoral: z.coerce.boolean(),
  isDefiniteDeparture: z.coerce.boolean(),
  displayOnBanner: z.coerce.boolean(),

  // Images
  logoUrl: z.string().optional(),
  bannerUrl: z.string().optional(),

  // Relations
  hotelId: z.string().optional(),
  tourGalleryId: z.string().optional(),
  venueGalleryId: z.string().optional(),
  fairGalleryId: z.string().optional(),

  // Arrays (These come as JSON strings from the hidden inputs)
  products: z.string().transform((str, ctx) => {
    try {
      return JSON.parse(str) as string[];
    } catch {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid JSON" });
      return [];
    }
  }),
  services: z.string().transform((str) => JSON.parse(str) as string[]),
  freeServices: z.string().transform((str) => JSON.parse(str) as string[]),

  // Packages (Nested JSON)
  packages: z.string().transform((str) => {
    try {
      // You might want a stricter schema for the package structure here
      return JSON.parse(str);
    } catch {
      return [];
    }
  }),
});

export type ActionState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
} | null;

// --- 2. CREATE ACTION ---
export async function createFairAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // 1. Convert FormData to Object
  const rawData = Object.fromEntries(formData.entries());

  // 2. Validate
  const validated = fairSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      error: "Lütfen formu kontrol ediniz.",
      fieldErrors: validated.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const data = validated.data;

  // 3. Helper to handle "unassigned" from Select components
  const cleanRelation = (id?: string) =>
    id === "unassigned" || !id ? null : id;

  try {
    await prisma.fair.create({
      data: {
        name: data.name,
        slug: data.slug,
        venue: data.venue,
        website: data.website,

        // NEW FIELDS MAPPED HERE
        category: data.category || null,
        type: data.type || null,

        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),

        description: data.description,
        summary: data.summary,

        status: data.status,
        isPublished: data.isPublished,
        isFeatured: data.isFeatured,
        isSectoral: data.isSectoral,
        isDefiniteDeparture: data.isDefiniteDeparture,
        displayOnBanner: data.displayOnBanner,

        logoUrl: data.logoUrl,
        bannerUrl: data.bannerUrl,

        // Arrays
        products: data.products,
        services: data.services,
        freeServices: data.freeServices,

        // Relations
        hotelId: cleanRelation(data.hotelId),
        tourGalleryId: cleanRelation(data.tourGalleryId),
        venueGalleryId: cleanRelation(data.venueGalleryId),
        fairGalleryId: cleanRelation(data.fairGalleryId),

        // Nested Packages Creation
        packages: {
          create: data.packages.map((pkg: any) => ({
            name: pkg.name,
            duration: pkg.duration,
            description: pkg.description,
            priceSingle: Number(pkg.priceSingle),
            priceDouble: Number(pkg.priceDouble),
            activities: {
              create: pkg.activities.map((act: any) => ({
                dayNumber: act.dayNumber,
                description: act.description,
              })),
            },
          })),
        },
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    // Handle Unique Constraint Violation (Slug)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        error: "Bu URL Slug adresi zaten kullanılıyor. Lütfen değiştirin.",
      };
    }
    return { error: "Veritabanı hatası oluştu." };
  }

  revalidatePath("/admin/fairs");
  redirect("/admin/fairs");
}

// --- 3. UPDATE ACTION ---
export async function updateFairAction(
  id: string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawData = Object.fromEntries(formData.entries());
  const validated = fairSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      error: "Lütfen formu kontrol ediniz.",
      fieldErrors: validated.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const data = validated.data;
  const cleanRelation = (val?: string) =>
    val === "unassigned" || !val ? null : val;

  try {
    // Transaction needed to safely update nested packages (delete old -> create new strategy is simplest)
    await prisma.$transaction(async (tx) => {
      // 1. Update Basic Fields
      await tx.fair.update({
        where: { id },
        data: {
          name: data.name,
          slug: data.slug,
          venue: data.venue,
          website: data.website,

          // NEW FIELDS MAPPED HERE
          category: data.category || null,
          type: data.type || null,

          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          description: data.description,
          summary: data.summary,
          status: data.status,
          isPublished: data.isPublished,
          isFeatured: data.isFeatured,
          isSectoral: data.isSectoral,
          isDefiniteDeparture: data.isDefiniteDeparture,
          displayOnBanner: data.displayOnBanner,
          logoUrl: data.logoUrl,
          bannerUrl: data.bannerUrl,
          products: data.products,
          services: data.services,
          freeServices: data.freeServices,
          hotelId: cleanRelation(data.hotelId),
          tourGalleryId: cleanRelation(data.tourGalleryId),
          venueGalleryId: cleanRelation(data.venueGalleryId),
          fairGalleryId: cleanRelation(data.fairGalleryId),
        },
      });

      // 2. Handle Packages (Simple Strategy: Delete All & Re-create)
      // Note: In a production app with user bookings, you wouldn't delete packages this casually.
      await tx.travelPackage.deleteMany({ where: { fairId: id } });

      for (const pkg of data.packages) {
        await tx.travelPackage.create({
          data: {
            fairId: id,
            name: pkg.name,
            duration: pkg.duration,
            description: pkg.description,
            priceSingle: Number(pkg.priceSingle),
            priceDouble: Number(pkg.priceDouble),
            activities: {
              create: pkg.activities.map((act: any) => ({
                dayNumber: act.dayNumber,
                description: act.description,
              })),
            },
          },
        });
      }
    });
  } catch (error) {
    console.error("Update Error:", error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "Bu URL Slug adresi zaten kullanılıyor." };
    }
    return { error: "Güncelleme sırasında hata oluştu." };
  }

  revalidatePath("/admin/fairs");
  redirect("/admin/fairs");
}

// --- DELETE ACTION ---
export async function deleteFairAction(id: string) {
  try {
    await prisma.fair.delete({
      where: { id },
    });

    revalidatePath("/admin/fairs");
    return { success: "Fuar başarıyla silindi." };
  } catch (error) {
    console.error("Delete Error:", error);
    return { error: "Silme işlemi sırasında hata oluştu." };
  }
}
