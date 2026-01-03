// lib/actions/gallery-actions.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createGallery(prevState: any, formData: FormData) {
  const rawImages = formData.get("images");
  const images = typeof rawImages === "string" ? JSON.parse(rawImages) : [];

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!name) return { error: "Name is required" };

  try {
    await prisma.photoGallery.create({
      data: {
        name,
        description,
        images,
      },
    });
  } catch (error) {
    return { error: "Failed to create gallery" };
  }

  revalidatePath("/admin/galleries");
  redirect("/admin/galleries");
}

// Helper for the Dropdown
export async function getGalleries() {
  return await prisma.photoGallery.findMany({
    orderBy: { name: "asc" }, // Sort alphabetically
  });
}
