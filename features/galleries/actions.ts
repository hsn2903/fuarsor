"use server"; // <--- CRITICAL: This tells Next.js this code runs on the Server

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { gallerySchema } from "./schama";
import prisma from "@/lib/prisma";

// --- CREATE ACTION ---
export async function createGalleryAction(prevState: any, formData: FormData) {
  // 1. Extract and Parse Data
  // Native HTML forms cannot send Arrays directly. We will send the images
  // as a JSON string (e.g., '["url1", "url2"]') and parse it here.
  const rawImages = formData.get("imageUrls");
  const parsedImages =
    typeof rawImages === "string" ? JSON.parse(rawImages) : [];

  // Construct a raw object from the form data
  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    type: formData.get("type"),
    imageUrls: parsedImages,
  };

  // 2. Validate Data (The Gatekeeper)
  const validated = gallerySchema.safeParse(rawData);

  // If validation fails, return errors to the UI
  if (!validated.success) {
    return {
      error: "Validasyon Hatası. Lütfen formu kontrol edin.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  // 3. Database Operation (The Worker)
  const { data } = validated; // Clean, type-safe data

  try {
    await prisma.gallery.create({
      data: {
        name: data.name,
        description: data.description,
        type: data.type,
        imageUrls: data.imageUrls,
      },
    });
  } catch (error) {
    console.error("Gallery Create Error:", error);
    return { error: "Veritabanı hatası oluştu. Lütfen tekrar deneyin." };
  }

  // 4. Cleanup
  // Clear the cache for the list page so the new gallery shows up immediately
  revalidatePath("/admin/galleries");

  // Send the user back to the list
  redirect("/admin/galleries");
}

// --- DELETE ACTION ---
export async function deleteGalleryAction(id: string) {
  try {
    await prisma.gallery.delete({
      where: { id },
    });

    // Refresh the list page to remove the deleted item
    revalidatePath("/admin/galleries");
    return { success: "Galeri başarıyla silindi." };
  } catch (error) {
    return { error: "Galeri silinirken bir hata oluştu." };
  }
}

// --- HELPER: FETCH FOR DROPDOWN ---
export async function getGalleryOptions() {
  const galleries = await prisma.gallery.findMany({
    select: { id: true, name: true }, // Select ONLY what we need
    orderBy: { name: "asc" },
  });
  return galleries;
}
