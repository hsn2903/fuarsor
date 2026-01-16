import { z } from "zod";

// Schema for fetching users with pagination and search
export const userSearchSchema = z.object({
  page: z.number().default(1),
  per_page: z.number().default(10),
  search: z.string().optional(),
  sort: z.string().optional(),
});

// Schema for updating a user (we'll use this in later chapters)
export const userUpdateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
});

export type UserSearchValues = z.infer<typeof userSearchSchema>;
export type UserUpdateValues = z.infer<typeof userUpdateSchema>;

// Append this to your existing file
export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Role is required"),
});

export type CreateUserValues = z.infer<typeof createUserSchema>;
