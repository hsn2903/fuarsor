import { z } from "zod";

// --- Sub-Schemas for Nested Data ---

// Activity (inside a package)
const activitySchema = z.object({
  dayNumber: z.coerce.number().min(1),
  description: z.string().min(1, "Aktivite açıklaması gereklidir."),
});

// Travel Package (Tour Program)
const packageSchema = z.object({
  // We use "string | undefined" for optional text inputs from the form
  name: z.string().min(1, "Paket adı gereklidir."),
  duration: z.string().optional(),
  description: z.string().optional(),

  // Coerce converts "100" string to 100 number automatically
  priceSingle: z.coerce.number().min(0).optional(),
  priceDouble: z.coerce.number().min(0).optional(),

  activities: z.array(activitySchema).default([]),
});

// --- MAIN FAIR SCHEMA ---

export const fairSchema = z.object({
  // 1. Basic Info
  name: z.string().min(2, "Fuar adı en az 2 karakter olmalıdır."),
  slug: z
    .string()
    .min(2, "Slug gereklidir (URL için).")
    .regex(/^[a-z0-9-]+$/, "Slug sadece küçük harf, rakam ve tire içerebilir."),

  description: z.string().min(10, "Açıklama çok kısa."),
  summary: z.string().optional(),
  venue: z.string().optional(),
  website: z.string().url("Geçersiz URL").optional().or(z.literal("")), // Allow empty string
  category: z.string().optional(),
  type: z.string().optional(),

  // 2. Dates (Strings from form -> Date objects)
  // z.coerce.date handles the conversion from "2026-01-01" string to Date object
  startDate: z
    .union([z.string(), z.date(), z.null(), z.undefined()])
    .refine((val) => !!val, { message: "Başlangıç tarihi seçiniz." })
    .pipe(z.coerce.date()),
  endDate: z
    .union([z.string(), z.date(), z.null(), z.undefined()])
    .refine((val) => !!val, { message: "Bitiş tarihi seçiniz." })
    .pipe(z.coerce.date()),

  // 3. Status & Flags
  status: z.enum(["Beklemede", "Aktif", "Pasif"]).default("Beklemede"),

  // Checkboxes usually send "on" or undefined. We handle boolean conversion manually in the Action,
  // but here we define the expected final type as boolean.
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isSectoral: z.boolean().default(false),
  isDefiniteDeparture: z.boolean().default(false),
  displayOnBanner: z.boolean().default(false),

  // 4. Media (Single Images)
  logoUrl: z.string().optional(),
  bannerUrl: z.string().optional(),

  // 5. Lists (Tags)
  products: z.array(z.string()).default([]),
  services: z.array(z.string()).default([]),
  freeServices: z.array(z.string()).default([]),

  // 6. Relationships (IDs of the independent entities)
  // These are optional strings (UUIDs)
  hotelId: z.string().optional().or(z.literal("")),
  tourGalleryId: z.string().optional().or(z.literal("")),
  venueGalleryId: z.string().optional().or(z.literal("")),
  fairGalleryId: z.string().optional().or(z.literal("")),

  // 7. Nested Complex Data
  packages: z.array(packageSchema).default([]),
});

export type FairFormValues = z.infer<typeof fairSchema>;
