// lib/schemas/fair-schema.ts
import { z } from "zod";

// Helper: Image Collection (used for Hotel, FairImages, TourImages)
const imageCollectionSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).default([]),
});

// Helper: Activity
const activitySchema = z.object({
  day: z.string().min(1, "Day is required"),
  activity: z.string().min(1, "Activity is required"),
});

// Helper: Tour Program
const tourProgramSchema = z.object({
  title1: z.string().optional(),
  title2: z.string().optional(),
  title3: z.string().optional(),
  onePersonPrice: z.coerce.number().optional(),
  twoPersonPrice: z.coerce.number().optional(),
  activities: z.array(activitySchema).default([]),
});

export const fairSchema = z.object({
  // Basic Strings
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  summary: z.string().optional(),
  website: z.string().optional(),
  venue: z.string().optional(),
  type: z.string().optional(),
  category: z.string().optional(),
  status: z.string().default("Beklemede"),
  tourNote: z.string().optional(),

  // Images
  logoImage: z.string().optional(),
  bannerImage: z.string().optional(),

  // Arrays (Tags)
  displayedProducts: z.array(z.string()).default([]),
  paidServices: z.array(z.string()).default([]),
  freeServices: z.array(z.string()).default([]),

  // Booleans
  displayOnBanner: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  isSectoral: z.boolean().default(false),
  isDefiniteDeparture: z.boolean().default(false),

  // Dates
  date: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),

  // Nested Objects
  hotel: imageCollectionSchema.optional(), // Reusing the shape since Hotel has name/desc/images
  fairImages: imageCollectionSchema.optional(),
  tourImages: imageCollectionSchema.optional(),

  // Nested Arrays
  tourPrograms: z.array(tourProgramSchema).default([]),
});

export type FairSchema = z.infer<typeof fairSchema>;
