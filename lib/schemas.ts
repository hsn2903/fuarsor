import * as z from "zod";
import { ZodSchema } from "zod";

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map((error) => error.message);

    throw new Error(errors.join(", "));
  }
  return result.data;
}

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "İsim en az 2 karakter içermelidir." }),
  lastName: z.string().min(2, {
    message: "Soyisim en az 2 karakter içermelidir.",
  }),
  userName: z
    .string()
    .min(2, { message: "Kullanıcı adı en az 2 karakter içermelidir." }),
});

export const imageSchema = z.object({
  image: validateFile(),
});

function validateFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, `File size must be less than 1 MB`)
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image");
}

export const propertySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .max(100, {
      message: "name must be less than 100 characters.",
    }),
  tagline: z
    .string()
    .min(2, {
      message: "tagline must be at least 2 characters.",
    })
    .max(100, {
      message: "tagline must be less than 100 characters.",
    }),
  price: z.coerce.number().int().min(0, {
    message: "price must be a positive number.",
  }),
  category: z.string(),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "description must be between 10 and 1000 words.",
    }
  ),
  country: z.string(),
  guests: z.coerce.number().int().min(0, {
    message: "guest amount must be a positive number.",
  }),
  bedrooms: z.coerce.number().int().min(0, {
    message: "bedrooms amount must be a positive number.",
  }),
  beds: z.coerce.number().int().min(0, {
    message: "beds amount must be a positive number.",
  }),
  baths: z.coerce.number().int().min(0, {
    message: "bahts amount must be a positive number.",
  }),
  amenities: z.string(),
});

export const blogSchema = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  summary: z.string(),
  category: z.string(),
  tags: z.string(),
  isPublished: z.coerce.boolean(),
  isFeatured: z.coerce.boolean(),
});

export const fairSchema = z.object({
  name: z.string().min(1, { message: "Fuar adı zorunludur." }),
  slug: z.string().min(1, { message: "Slug alanı zorunludur." }),
  description: z.string().min(1, { message: "Açıklama alanı zorunludur." }),
  summary: z.string().min(1, { message: "Özet alanı zorunludur." }),
  website: z
    .string()
    .url({ message: "Geçerli bir web sitesi URL'si giriniz." }),
  venue: z.string().min(1, { message: "Mekan bilgisi zorunludur." }),
  type: z.string().min(1, { message: "Fuar tipi zorunludur." }),
  category: z.string().min(1, { message: "Kategori zorunludur." }),
  displayedProducts: z
    .string()
    .min(1, { message: "Sergilenen ürünler alanı zorunludur." }),
  tourGuide: z.string().min(1, { message: "Tur rehberi bilgisi zorunludur." }),

  hotelId: z.string().optional(),
  fairImagesId: z.string().optional(),
  tourImagesId: z.string().optional(),

  isPublished: z.coerce.boolean({ message: "Yayınlanma durumu zorunludur." }),
  isFeatured: z.coerce.boolean({ message: "Öne çıkarma durumu zorunludur." }),
  onBanner: z.coerce.boolean({ message: "Banner durumu zorunludur." }),
  isSectoralFairIndex: z.coerce.boolean({
    message: "Sektörel fuar dizini durumu zorunludur.",
  }),
  isDefiniteDepartureTour: z.coerce.boolean({
    message: "Kesin hareketli tur durumu zorunludur.",
  }),

  date: z.string().min(1, { message: "Tarih bilgisi zorunludur." }),
  startDate: z.coerce.date({
    message: "Geçerli bir başlangıç tarihi giriniz.",
  }),
  endDate: z.coerce.date({ message: "Geçerli bir bitiş tarihi giriniz." }),

  freeServices: z
    .string()
    .min(1, { message: "Ücretsiz hizmetler alanı zorunludur." }),
  paidServices: z
    .string()
    .min(1, { message: "Ücretli hizmetler alanı zorunludur." }),
});

export const messageSchema = z.object({
  name: z.string().min(1, { message: "İsminiz en az 1 karakter içermelidir." }),
  email: z
    .string()
    .email()
    .min(1, { message: "Email adresiniz en az 1 karakter içermelidir." }),
  subject: z
    .string()
    .min(1, { message: "Konu başlığı en az 1 karakter içermelidir." }),
  contactMessage: z
    .string()
    .min(1, { message: "Messjınız en az 1 karakter içermelidir." }),
  from: z.string().optional(),
});

export const hotelSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Otel ismi en az 2 karakter içermelidir." }),
  description: z
    .string()
    .min(5, { message: "Açıklama en az 5 karakter içermelidir" }),
  images: z.array(z.string().url()).optional().default([]),
});

export const campanySchema = z.object({
  name: z.string().min(4),
  description: z.string(),
  isPublished: z.coerce.boolean(),
});
