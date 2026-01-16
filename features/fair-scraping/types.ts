// types/index.ts

export interface DraftFair {
  id: string; // Geçici ID (Listede key olarak kullanmak için)
  name: string;
  slug: string;
  description: string;
  venue: string | null;
  website: string | null; // Eventseye linkini buraya koyacağız
  startDate: Date;
  endDate: Date;
  status: "Beklemede" | "Aktif" | "Pasif";

  // Prisma modelindeki diğer varsayılan alanlar otomatik atanacağı için buraya almıyoruz
  // (isPublished, products, services vb.)
}
