"use server";

import prisma from "@/lib/prisma";
import { renderError } from "@/lib/error-handling";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const SeoPageSchema = z.object({
  id: z.string().optional(),
  url: z.string().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  keywords: z.string(),
});

export async function createSeoData(prevData: unknown, formData: FormData) {
  const rawData = Object.fromEntries(formData);
  const validatedData = SeoPageSchema.parse(rawData);

  try {
    await prisma.seoPage.create({
      data: validatedData,
    });

    revalidatePath("/dashboard/seo");
    return { message: "Kaydedildi" };
  } catch (error) {
    return renderError(error);
  }
}

export async function updateSeoData(prevState: unknown, formData: FormData) {
  const rawData = Object.fromEntries(formData);
  const validatedData = SeoPageSchema.parse(rawData);
  const id = validatedData.id;

  try {
    await prisma.seoPage.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/dashboard/seo");
    return { message: "SEO bilgileri güncellendi" };
  } catch (error) {
    return renderError(error);
  }
}

export async function deleteSeoPage(id: string) {
  try {
    await prisma.seoPage.delete({
      where: { id },
    });
  } catch (error) {
    return { error: "Failed to delete SEO page" };
  }

  revalidatePath("/dashboard/seo");
}

export async function getSeoPages() {
  try {
    return await prisma.seoPage.findMany();
  } catch (error) {
    throw new Error("Failed to fetch SEO pages");
  }
}

export async function getSeoDataById(id: string) {
  try {
    return await prisma.seoPage.findUnique({
      where: { id },
    });
  } catch (error) {
    throw new Error("Failed to fetch SEO page");
  }
}
