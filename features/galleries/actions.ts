"use server"; // <--- CRITICAL: Marks this as Server Code

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { gallerySchema } from "./schama";
import prisma from "@/lib/prisma";

// --- CREATE ACTION ---
export async function createGalleryAction(prevState: any, formData: FormData) {
  // 1. Transform FormData
  // HTML forms can't send Arrays natively. We will send images as a JSON string.
  const rawImages = formData.get("imageUrls");
  const parsedImages =
    typeof rawImages === "string" ? JSON.parse(rawImages) : [];

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    type: formData.get("type"),
    imageUrls: parsedImages,
  };

  // 2. Validate Data
  const validated = gallerySchema.safeParse(rawData);

  if (!validated.success) {
    // If invalid, return errors to the UI
    return {
      error: "Validasyon Hatası",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  // 3. Save to Database
  try {
    await prisma.gallery.create({
      data: {
        name: validated.data.name,
        description: validated.data.description,
        type: validated.data.type,
        imageUrls: validated.data.imageUrls,
      },
    });
  } catch (error) {
    console.error("Gallery Create Error:", error);
    return { error: "Veritabanı hatası oluştu." };
  }

  // 4. Refresh Cache & Redirect
  revalidatePath("/admin/galleries");
  redirect("/admin/galleries");
}

// --- DELETE ACTION ---
export async function deleteGalleryAction(id: string) {
  try {
    await prisma.gallery.delete({
      where: { id },
    });

    // Refresh the list to remove the deleted item
    revalidatePath("/admin/galleries");
    return { success: "Galeri silindi." };
  } catch (error) {
    return { error: "Silinemedi. Bu galeri bir fuarda kullanılıyor olabilir." };
  }
}

// --- UPDATE ACTION ---
export async function updateGalleryAction(
  id: string, // We need the ID as the first argument
  prevState: any,
  formData: FormData
) {
  // 1. Transform FormData
  const rawImages = formData.get("imageUrls");
  const parsedImages =
    typeof rawImages === "string" ? JSON.parse(rawImages) : [];

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    type: formData.get("type"), // Zod will check if this is valid ENUM
    imageUrls: parsedImages,
  };

  // 2. Validate Data
  const validated = gallerySchema.safeParse(rawData);

  if (!validated.success) {
    return {
      error: "Validasyon Hatası",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  // 3. Database Update
  try {
    await prisma.gallery.update({
      where: { id }, // Find the record by ID
      data: {
        name: validated.data.name,
        description: validated.data.description,
        type: validated.data.type,
        imageUrls: validated.data.imageUrls,
      },
    });
  } catch (error) {
    console.error("Gallery Update Error:", error);
    return { error: "Güncelleme sırasında bir hata oluştu." };
  }

  // 4. Refresh & Redirect
  revalidatePath("/admin/galleries");
  revalidatePath(`/admin/galleries/${id}/edit`); // Clear cache for the edit page itself
  redirect("/admin/galleries");
}
