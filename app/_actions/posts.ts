// lib/actions/post.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PostFormSchema, PostFormValues } from "../admin/posts/schemas";
import prisma from "@/lib/prisma";

// We return a simple object to handle success/error states in the UI
export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: { [key: string]: string[] }; // For field-specific errors
};

export async function createPost(
  data: PostFormValues
): Promise<ActionResponse> {
  // 1. Validate data using Zod
  const validatedFields = PostFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid fields",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, slug, content, coverImage, published, category } =
    validatedFields.data;

  try {
    // 2. Check for unique slug manually (optional, but good UX)
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return {
        success: false,
        message: "A post with this slug already exists.",
      };
    }

    // 3. Create the post in Prisma
    await prisma.post.create({
      data: {
        title,
        slug,
        content,
        coverImage,
        published,
        category,
      },
    });

    // 4. Revalidate the path so the admin list updates
    revalidatePath("/admin/posts");

    return { success: true, message: "Post created successfully" };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      success: false,
      message: "Failed to create post. Please try again.",
    };
  }
}

// ... inside lib/actions/post.ts

export async function updatePost(
  id: string,
  data: PostFormValues
): Promise<ActionResponse> {
  const validatedFields = PostFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid fields",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, slug, content, coverImage, published, category } =
    validatedFields.data;

  try {
    // 1. Check if a DIFFERENT post already has this slug
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (existingPost && existingPost.id !== id) {
      return {
        success: false,
        message: "A post with this slug already exists.",
      };
    }

    // 2. Update the post
    await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        coverImage,
        published,
        category,
      },
    });

    // 3. Revalidate path
    revalidatePath("/admin/posts");
    revalidatePath(`/admin/posts/${id}`); // Also revalidate the specific edit page

    return { success: true, message: "Post updated successfully" };
  } catch (error) {
    console.error("Update Error:", error);
    return {
      success: false,
      message: "Failed to update post.",
    };
  }
}
