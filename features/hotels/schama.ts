import { z } from "zod";

export const hotelSchema = z.object({
  // Name is required and must be significant
  name: z.string().min(2, "Otel adı en az 2 karakter olmalıdır."),

  // Description is optional
  description: z.string().optional(),

  // Images: Valid URLs. Defaults to empty array.
  imageUrls: z.array(z.string().url("Geçersiz resim bağlantısı.")).default([]),
});

export type HotelFormValues = z.infer<typeof hotelSchema>;
