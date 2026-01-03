"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fairSchema } from "./schama";
import prisma from "@/lib/prisma";

// Helper to sanitize relation IDs (handle "no-selection" or empty strings)
function sanitizeRelationId(id: string | null | undefined) {
  if (!id || id === "no-selection") return null;
  return id;
}

export async function createFairAction(prevState: any, formData: FormData) {
  // --- 1. HELPER: Safe JSON Parsing ---
  // Since we send arrays (products, packages) as JSON strings,
  // we need a safe way to parse them without crashing.
  const parseJson = (key: string, fallback: any) => {
    const value = formData.get(key);
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return fallback;
      }
    }
    return fallback;
  };

  // --- 2. EXTRACT & PREPARE DATA ---
  const rawData = {
    // A. Text Fields
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    summary: formData.get("summary"),
    venue: formData.get("venue"),
    website: formData.get("website"),

    // B. Dates (Zod will coerce these strings to Dates)
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),

    // C. Status & Dropdowns
    status: formData.get("status"),

    // D. Booleans (Checkboxes)
    // In HTML, a checked box sends "on", an unchecked one sends null.
    isPublished: formData.get("isPublished") === "on",
    isFeatured: formData.get("isFeatured") === "on",
    isSectoral: formData.get("isSectoral") === "on",
    isDefiniteDeparture: formData.get("isDefiniteDeparture") === "on",
    displayOnBanner: formData.get("displayOnBanner") === "on",

    // E. Media (Single Images)
    logoUrl: formData.get("logoUrl"),
    bannerUrl: formData.get("bannerUrl"),

    // F. Relationships (IDs from Independent Entities)
    // We send empty strings if nothing is selected, Zod handles that.
    hotelId: formData.get("hotelId"),
    tourGalleryId: formData.get("tourGalleryId"),
    venueGalleryId: formData.get("venueGalleryId"),
    fairGalleryId: formData.get("fairGalleryId"),

    // G. Complex JSON Data
    products: parseJson("products", []),
    services: parseJson("services", []),
    freeServices: parseJson("freeServices", []),

    // THE BIG ONE: Nested Packages & Activities
    packages: parseJson("packages", []),
  };

  // --- 3. VALIDATION ---
  const validated = fairSchema.safeParse(rawData);

  if (!validated.success) {
    // Return errors to the UI so we can show red borders
    return {
      error: "Validasyon Hatası. Lütfen zorunlu alanları kontrol edin.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;

  // --- 4. DATABASE CREATION (Nested Writes) ---
  try {
    await prisma.fair.create({
      data: {
        // Simple Fields
        name: data.name,
        slug: data.slug,
        description: data.description,
        summary: data.summary,
        venue: data.venue,
        website: data.website || null, // Convert empty string to null for DB
        startDate: data.startDate,
        endDate: data.endDate,
        status: data.status,

        // Booleans
        isPublished: data.isPublished,
        isFeatured: data.isFeatured,
        isSectoral: data.isSectoral,
        isDefiniteDeparture: data.isDefiniteDeparture,
        displayOnBanner: data.displayOnBanner,

        // Media & Tags
        logoImage: data.logoUrl,
        bannerImage: data.bannerUrl,
        displayedProducts: data.products,
        paidServices: data.services,
        freeServices: data.freeServices,

        // Relations: Connect IDs if they exist
        // undefined means "do nothing", null means "disconnect"
        hotelId: sanitizeRelationId(data.hotelId),
        tourGalleryId: sanitizeRelationId(data.tourGalleryId),
        venueGalleryId: sanitizeRelationId(data.venueGalleryId),
        fairGalleryId: sanitizeRelationId(data.fairGalleryId),

        // NESTED WRITE: Create Packages AND their Activities
        packages: {
          create: data.packages.map((pkg) => ({
            name: pkg.name,
            duration: pkg.duration,
            description: pkg.description,
            priceSingle: pkg.priceSingle,
            priceDouble: pkg.priceDouble,

            // Nested write level 2: Activities
            activities: {
              create: pkg.activities.map((act) => ({
                dayNumber: act.dayNumber,
                description: act.description,
              })),
            },
          })),
        },
      },
    });
  } catch (error) {
    console.error("Fair Create Error:", error);
    // Prisma error code P2002 means "Unique constraint failed" (Duplicate Slug)
    // @ts-ignore
    if (error.code === "P2002") {
      return { error: "Bu URL (slug) zaten kullanılıyor. Lütfen değiştirin." };
    }
    return { error: "Fuar oluşturulurken bir hata oluştu." };
  }

  // --- 5. FINISH ---
  revalidatePath("/admin/fairs");
  redirect("/admin/fairs");
}

// ... existing imports

// --- DELETE ACTION ---
export async function deleteFairAction(id: string) {
  try {
    // Because we used "onDelete: Cascade" in schema.prisma,
    // deleting a Fair AUTOMATICALLY deletes all its TravelPackages and Activities.
    await prisma.fair.delete({
      where: { id },
    });

    revalidatePath("/admin/fairs");
    return { success: "Fuar başarıyla silindi." };
  } catch (error) {
    console.error("Delete Error:", error);
    return { error: "Fuar silinirken bir hata oluştu." };
  }
}

// ... existing imports

// --- UPDATE ACTION ---
export async function updateFairAction(
  id: string, // We need the ID to know which fair to update
  prevState: any,
  formData: FormData
) {
  // 1. Helper for JSON parsing (Same as create)
  const parseJson = (key: string, fallback: any) => {
    const value = formData.get(key);
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return fallback;
      }
    }
    return fallback;
  };

  // 2. Extract Data (Same as create)
  const rawData = {
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    summary: formData.get("summary"),
    venue: formData.get("venue"),
    website: formData.get("website"),

    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),

    status: formData.get("status"),

    isPublished: formData.get("isPublished") === "on",
    isFeatured: formData.get("isFeatured") === "on",
    isSectoral: formData.get("isSectoral") === "on",
    isDefiniteDeparture: formData.get("isDefiniteDeparture") === "on",
    displayOnBanner: formData.get("displayOnBanner") === "on",

    logoUrl: formData.get("logoUrl"),
    bannerUrl: formData.get("bannerUrl"),

    hotelId: formData.get("hotelId"),
    tourGalleryId: formData.get("tourGalleryId"),
    venueGalleryId: formData.get("venueGalleryId"),
    fairGalleryId: formData.get("fairGalleryId"),

    products: parseJson("products", []),
    services: parseJson("services", []),
    freeServices: parseJson("freeServices", []),

    packages: parseJson("packages", []),
  };

  // 3. Validate
  const validated = fairSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      error: "Validasyon Hatası. Lütfen alanları kontrol edin.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;

  // 4. DATABASE UPDATE (The Transaction)
  try {
    // We use a Transaction to ensure we clean up old packages before adding new ones
    // This is the simplest way to handle "Editing" nested lists: Delete All -> Re-create All
    await prisma.$transaction(async (tx) => {
      // A. Delete existing packages (and their activities via Cascade)
      await tx.travelPackage.deleteMany({
        where: { fairId: id },
      });

      // B. Update the Fair and create NEW packages
      await tx.fair.update({
        where: { id },
        data: {
          // Simple Fields
          name: data.name,
          slug: data.slug,
          description: data.description,
          summary: data.summary,
          venue: data.venue,
          website: data.website || null,
          startDate: data.startDate,
          endDate: data.endDate,
          status: data.status,

          // Booleans
          isPublished: data.isPublished,
          isFeatured: data.isFeatured,
          isSectoral: data.isSectoral,
          isDefiniteDeparture: data.isDefiniteDeparture,
          displayOnBanner: data.displayOnBanner,

          // Media & Tags
          logoImage: data.logoUrl,
          bannerImage: data.bannerUrl,
          displayedProducts: data.products,
          paidServices: data.services,
          freeServices: data.freeServices,

          // Relations
          hotelId: sanitizeRelationId(data.hotelId),
          tourGalleryId: sanitizeRelationId(data.tourGalleryId),
          venueGalleryId: sanitizeRelationId(data.venueGalleryId),
          fairGalleryId: sanitizeRelationId(data.fairGalleryId),

          // NESTED WRITE: Re-create Packages
          packages: {
            create: data.packages.map((pkg) => ({
              name: pkg.name,
              duration: pkg.duration,
              description: pkg.description,
              priceSingle: pkg.priceSingle,
              priceDouble: pkg.priceDouble,

              activities: {
                create: pkg.activities.map((act) => ({
                  dayNumber: act.dayNumber,
                  description: act.description,
                })),
              },
            })),
          },
        },
      });
    });
  } catch (error) {
    console.error("Fair Update Error:", error);
    // @ts-ignore
    if (error.code === "P2002") {
      return { error: "Bu URL (slug) zaten kullanılıyor." };
    }
    return { error: "Güncelleme sırasında hata oluştu." };
  }

  // 5. Finish
  revalidatePath("/admin/fairs");
  revalidatePath(`/admin/fairs/${id}/edit`); // Clear cache for the edit page too
  redirect("/admin/fairs");
}
