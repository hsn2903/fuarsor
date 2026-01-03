// lib/actions/hotel-actions.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const hotelSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  images: z.string().optional(), // We will parse JSON string from form
});

export async function createHotel(prevState: any, formData: FormData) {
  const rawImages = formData.get("images");
  const images = typeof rawImages === "string" ? JSON.parse(rawImages) : [];

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    images: rawImages, // logic handled above, but for Zod validation:
  };

  try {
    await prisma.fairHotel.create({
      data: {
        name: rawData.name as string,
        description: rawData.description as string,
        images: images,
      },
    });
  } catch (error) {
    return { error: "Failed to create hotel" };
  }

  revalidatePath("/admin/hotels");
  redirect("/admin/hotels"); // Redirect to list
}

// Helper to fetch for dropdown
export async function getHotels() {
  return await prisma.fairHotel.findMany({
    orderBy: { name: "asc" },
  });
}
