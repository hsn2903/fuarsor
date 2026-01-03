// lib/actions/fair-actions.ts
"use server";

import prisma from "@/lib/prisma";
import { fairSchema } from "@/lib/schemas/fair-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createFair(prevState: any, formData: FormData) {
  // 1. Helper to parse JSON from FormData safely
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

  // 2. construct raw object
  const rawData = {
    // Strings
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    summary: formData.get("summary") as string,
    website: formData.get("website") as string,
    venue: formData.get("venue") as string,
    type: formData.get("type") as string,
    category: formData.get("category"),
    status: formData.get("status"),
    tourNote: formData.get("tourNote") as string,
    logoImage: formData.get("logoImage") as string,
    bannerImage: formData.get("bannerImage") as string,
    date: formData.get("date") as string,

    // Dates
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),

    // Booleans (Checkboxes send "on" if checked)
    displayOnBanner: formData.get("displayOnBanner") === "on",
    isFeatured: formData.get("isFeatured") === "on",
    isPublished: formData.get("isPublished") === "on",
    isSectoral: formData.get("isSectoral") === "on",
    isDefiniteDeparture: formData.get("isDefiniteDeparture") === "on",

    // JSON Fields (We will stringify these in the frontend)
    displayedProducts: parseJson("displayedProductsJson", []),
    paidServices: parseJson("paidServicesJson", []),
    freeServices: parseJson("freeServicesJson", []),

    // Nested Objects
    hotel: parseJson("hotelJson", {}),
    fairImages: parseJson("fairImagesJson", {}),
    tourImages: parseJson("tourImagesJson", {}),
    tourPrograms: parseJson("tourProgramsJson", []),
  };

  // 3. Validate
  const result = fairSchema.safeParse(rawData);

  if (!result.success) {
    return {
      error: "Validation Failed",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const data = result.data;

  const hotelId = formData.get("fairHotelId") as string;
  const tourGalleryId = formData.get("tourGalleryId") as string;

  // 4. Write to DB
  try {
    await prisma.fair.create({
      data: {
        // Scalar Fields
        name: data.name,
        slug: data.slug,
        description: data.description,
        summary: data.summary as string,
        website: data.website,
        venue: data.venue,
        type: data.type,
        category: data.category,
        status: data.status,
        tourNote: data.tourNote,
        logoImage: data.logoImage,
        bannerImage: data.bannerImage,
        date: data.date,
        startDate: data.startDate,
        endDate: data.endDate,

        displayOnBanner: data.displayOnBanner,
        isFeatured: data.isFeatured,
        isPublished: data.isPublished,
        isSectoral: data.isSectoral,
        isDefiniteDeparture: data.isDefiniteDeparture,

        displayedProducts: data.displayedProducts,
        paidServices: data.paidServices,
        freeServices: data.freeServices,

        // Relations
        fairHotelId: hotelId || null,
        tourGalleryId: tourGalleryId || null,

        fairImages: data.fairImages
          ? {
              create: {
                name: data.fairImages.name,
                description: data.fairImages.description,
                images: data.fairImages.images,
              },
            }
          : undefined,

        tourPrograms: {
          create: data.tourPrograms.map((p) => ({
            title1: p.title1,
            title2: p.title2,
            title3: p.title3,
            onePersonPrice: p.onePersonPrice,
            twoPersonPrice: p.twoPersonPrice,
            activities: {
              create: p.activities.map((a) => ({
                day: a.day,
                description: a.activity,
              })),
            },
          })),
        },
      },
    });
  } catch (error) {
    console.error("DB Error", error);
    return { error: "Failed to create fair" };
  }

  revalidatePath("/admin/fairs");
  redirect("/admin/fairs");
}
