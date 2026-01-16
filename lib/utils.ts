import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Boşlukları tireyle değiştir
    .replace(/[^\w\-]+/g, "") // Harf, rakam ve tire dışındakileri sil
    .replace(/\-\-+/g, "-"); // Birden fazla tireyi tek tireye indir
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
