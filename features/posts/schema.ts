import z from "zod";

export const PostSchema = z.object({
  title: z.string().min(3),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/),
  content: z.string().optional(),
  coverImage: z.string().optional(),
  category: z.string().optional(),
});
