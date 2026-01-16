"use server";

import { auth } from "@/lib/auth"; // Adjust your auth import path
import { headers } from "next/headers";
import { z } from "zod";
import {
  createUserSchema,
  CreateUserValues,
  userSearchSchema,
  userUpdateSchema,
  UserUpdateValues,
} from "./schemas";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPaginatedUsers(
  input: z.infer<typeof userSearchSchema>
) {
  // 1. Validate Input
  const parsed = userSearchSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Invalid input parameters" };
  }

  const { page, per_page, search } = parsed.data;

  // 2. Auth Check: Protect this resource
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Verify user exists and has admin role (checking string equality)
  if (!session || session.user.role !== "ADMIN") {
    return { error: "Unauthorized: Admin access required" };
  }

  // 3. Build the Query Filters
  const where: any = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  try {
    // 4. Execute Transaction to get Data + Count simultaneously
    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        skip: (page - 1) * per_page,
        take: per_page,
        orderBy: { createdAt: "desc" }, // Default sort by newest
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          createdAt: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    const pageCount = Math.ceil(total / per_page);

    return {
      data: users,
      metadata: {
        total,
        page,
        pageCount,
        hasNextPage: page < pageCount,
        hasPrevPage: page > 1,
      },
    };
  } catch (err) {
    console.error("Failed to fetch users:", err);
    return { error: "Failed to fetch user data" };
  }
}

export async function createUser(values: CreateUserValues) {
  // 1. Validate Input
  const parsed = createUserSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Invalid input data" };
  }

  const { name, email, password, role } = parsed.data;

  // 2. Authorization Check (Verify Admin)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  try {
    // 3. Use Better-Auth API to create the user
    // This handles password hashing and account linking automatically.
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        // We pass the role in metadata or extra fields if your setup allows,
        // otherwise we might need a separate Prisma update to set the role.
      },
    });

    // 4. Update Role (if signUpEmail doesn't support custom fields directly)
    // Most auth setups default to 'user', so we force the role update here.
    const newUser = await prisma.user.update({
      where: { email },
      data: { role },
    });

    // 5. Revalidate the UI
    revalidatePath("/users");

    return { success: true, user: newUser };
  } catch (error: any) {
    console.error("Create user error:", error);
    // Better-auth might throw specific errors (e.g., email already exists)
    return {
      error:
        error?.body?.message || "Failed to create user. Email might be taken.",
    };
  }
}

export async function updateUser(values: UserUpdateValues) {
  // 1. Validate
  const parsed = userUpdateSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Invalid input data" };
  }

  const { id, name, email, role } = parsed.data;

  // 2. Auth Check
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  try {
    // 3. Update in DB
    await prisma.user.update({
      where: { id },
      data: { name, email, role },
    });

    // 4. Revalidate
    revalidatePath("/users");
    return { success: true };
  } catch (error) {
    console.error("Update user error:", error);
    return { error: "Failed to update user." };
  }
}

export async function deleteUser(userId: string) {
  // 1. Auth Check
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  // Prevent admin from deleting themselves
  if (session.user.id === userId) {
    return { error: "You cannot delete your own account." };
  }

  try {
    // 2. Database Delete
    // Ensure your Prisma schema has onDelete: Cascade for Sessions/Accounts
    // otherwise you might need to delete those related records first.
    await prisma.user.delete({
      where: { id: userId },
    });

    // 3. Revalidate
    revalidatePath("/users");
    return { success: true };
  } catch (error) {
    console.error("Delete user error:", error);
    return { error: "Failed to delete user." };
  }
}
