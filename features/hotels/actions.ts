"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hotelSchema } from "./schema";
import prisma from "@/lib/prisma";

// --- CREATE ACTION ---
export async function createHotelAction(prevState: any, formData: FormData) {
  // 1. Parse JSON Images
  // (Recall: HTML forms send arrays as strings like "['url1','url2']")
  const rawImages = formData.get("imageUrls");
  const parsedImages =
    typeof rawImages === "string" ? JSON.parse(rawImages) : [];

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    imageUrls: parsedImages,
  };

  // 2. Validate
  const validated = hotelSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      error: "Validasyon Hatası",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  // 3. Database Write
  try {
    await prisma.hotel.create({
      data: {
        name: validated.data.name,
        description: validated.data.description,
        imageUrls: validated.data.imageUrls,
      },
    });
  } catch (error) {
    console.error("Hotel Create Error:", error);
    return { error: "Veritabanına kaydedilirken hata oluştu." };
  }

  // 4. Finish
  revalidatePath("/admin/hotels");
  redirect("/admin/hotels");
}

// --- DELETE ACTION ---
export async function deleteHotelAction(id: string) {
  try {
    await prisma.hotel.delete({
      where: { id },
    });

    revalidatePath("/admin/hotels");
    return { success: "Otel başarıyla silindi." };
  } catch (error) {
    // Prisma error P2003 = Foreign Key Constraint (Hotel is in use)
    return { error: "Bu otel silinemez çünkü aktif bir fuar paketine bağlı." };
  }
}

// ... existing imports

// --- UPDATE ACTION ---
export async function updateHotelAction(
  id: string,
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
    imageUrls: parsedImages,
  };

  // 2. Validate
  const validated = hotelSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      error: "Validasyon Hatası",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  // 3. Update Database
  try {
    await prisma.hotel.update({
      where: { id },
      data: {
        name: validated.data.name,
        description: validated.data.description,
        imageUrls: validated.data.imageUrls,
      },
    });
  } catch (error) {
    console.error("Hotel Update Error:", error);
    return { error: "Güncelleme sırasında hata oluştu." };
  }

  // 4. Refresh & Redirect
  revalidatePath("/admin/hotels");
  revalidatePath(`/admin/hotels/${id}/edit`);
  redirect("/admin/hotels");
}
