"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// 1. Define the schema
const PostSchema = z.object({
  title: z.string().min(3),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/),
  content: z.string().optional(),
  coverImage: z.string().optional(),
  category: z.string().optional(), // Changed from categoryId
});

// 2. Define the State type
export type PostFormState = {
  errors?: {
    title?: string[];
    slug?: string[];
    content?: string[];
  };
  message?: string;
};

// 3. Update the action signature
// Note: We added 'prevState' as the first argument, which is required by useActionState
export async function createPost(
  prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const rawData = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    content: formData.get("content") as string,
    category: (formData.get("category") as string) || "Diğer",
    coverImage: (formData.get("coverImage") as string) || undefined,
  };

  // Validate fields
  const validatedData = PostSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create post.",
    };
  }

  // Database insertion
  try {
    await prisma.post.create({
      data: {
        title: validatedData.data.title,
        slug: validatedData.data.slug,
        content: validatedData.data.content,
        published: false,
        category: validatedData.data.category,
        coverImage: validatedData.data.coverImage,
      },
    });
  } catch (error) {
    // Check if it's a Prisma unique constraint violation
    // (P2002 is the error code for unique constraint failed)
    // @ts-ignore
    if (error.code === "P2002") {
      return {
        message: "Bu slug kullanılıyor.",
        errors: { slug: ["Slug must be unique"] },
      };
    }
    return {
      message: "Veritabanı Hatası: Kayıt oluşturulamadı.",
    };
  }

  // Revalidate and Redirect
  // We cannot return inside the try/catch because redirect() throws an internal error specifically for Next.js to handle navigation
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function updatePost(
  prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const id = formData.get("id") as string;

  const rawData = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    content: formData.get("content"),
    // published: formData.get("published") as boolean,
    category: formData.get("category") as string,
    coverImage: (formData.get("coverImage") as string) || undefined,
  };

  // Validate fields
  const validatedData = PostSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Eksik alanlar. Kayıt güncellenemedi.",
    };
  }

  // Database update
  try {
    await prisma.post.update({
      where: { id },
      data: {
        title: validatedData.data.title,
        slug: validatedData.data.slug,
        content: validatedData.data.content,
        category: validatedData.data.category,
        coverImage: validatedData.data.coverImage,
      },
    });
  } catch (error) {
    // Check if it's a Prisma unique constraint violation
    // (P2002 is the error code for unique constraint failed)
    // @ts-ignore
    if (error.code === "P2002") {
      return {
        message: "Bu slug kullanılıyor.",
        errors: { slug: ["Slug must be unique"] },
      };
    }
    return {
      message: "Veritabanı Hatası: Kayıt güncellenemedi.",
    };
  }

  // Revalidate and Redirect
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  try {
    await prisma.post.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error("Failed to delete post");
  }

  revalidatePath("/admin/posts");
}

export async function togglePostStatus(id: string, isPublished: boolean) {
  try {
    await prisma.post.update({
      where: { id },
      data: { published: isPublished },
    });
  } catch (error) {
    throw new Error("Failed to update status");
  }

  revalidatePath("/admin/posts");
}
