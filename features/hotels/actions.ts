"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hotelSchema } from "./schama";
import prisma from "@/lib/prisma";

// --- CREATE ACTION ---
export async function createHotelAction(prevState: any, formData: FormData) {
  // 1. Parse JSON images
  const rawImages = formData.get("imageUrls");
  const parsedImages =
    typeof rawImages === "string" ? JSON.parse(rawImages) : [];

  // 2. Construct Data
  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    imageUrls: parsedImages,
  };

  // 3. Validate
  const validated = hotelSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      error: "Validasyon Hatası",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  // 4. Save to DB
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
    return { error: "Otel oluşturulurken veritabanı hatası oluştu." };
  }

  // 5. Cleanup
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
    return { error: "Otel silinemedi. Bir fuara bağlı olabilir." };
  }
}

// --- HELPER: FETCH FOR DROPDOWN ---
// We will use this in Chapter 13 when building the Fair form.
// It creates a lightweight list of hotels (ID and Name only).
export async function getHotelOptions() {
  const hotels = await prisma.hotel.findMany({
    select: { id: true, name: true }, // Select ONLY what we need for a dropdown
    orderBy: { name: "asc" },
  });
  return hotels;
}
