import { z } from "zod";

export const hotelSchema = z.object({
  // Name is strictly required
  name: z.string().min(2, {
    message: "Otel adı en az 2 karakter olmalıdır.",
  }),

  // Description is highly recommended but we allow empty strings if needed
  description: z.string().min(10, {
    message: "Otel hakkında en az 10 karakterlik bilgi giriniz.",
  }),

  // Images array (URLs)
  imageUrls: z.array(z.string().url()).default([]),
});

export type HotelFormValues = z.infer<typeof hotelSchema>;
