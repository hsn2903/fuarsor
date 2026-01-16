import * as z from "zod";

export const CampaignSchema = z.object({
  name: z.string().min(1, {
    message: "Başlık zorunlu",
  }),
  description: z.string().min(1, {
    message: "Açıklama zorunlu",
  }),
  image: z.string().min(1, {
    message: "Resim zorunlu",
  }),
  isPublished: z.boolean().default(false),
});

// We export the type to use in our React components
export type CampaignFormValues = z.infer<typeof CampaignSchema>;
