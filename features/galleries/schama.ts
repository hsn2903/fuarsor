import { z } from "zod";

// Define the shape of the form data
export const gallerySchema = z.object({
  // Name: Must be a string, min 2 chars
  name: z.string().min(2, "Galeri adı en az 2 karakter olmalıdır."),

  // Description: Optional string
  description: z.string().optional(),

  // Type: Must be one of these specific values
  type: z
    .enum(["GENERAL", "TOUR", "VENUE"], {
      message: "Lütfen bir galeri türü seçiniz.",
    })
    .default("GENERAL"),

  // Image URLs: An array of valid URL strings.
  // We default to an empty array so the form doesn't crash if empty.
  imageUrls: z.array(z.string().url("Geçersiz resim bağlantısı.")).default([]),
});

// Extract the TypeScript type from the schema automatically
// This is amazing because we don't need to manually write an Interface!
export type GalleryFormValues = z.infer<typeof gallerySchema>;
