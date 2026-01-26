"use server";

import * as cheerio from "cheerio";
import { DraftFair } from "./types";
import { slugify, addDays } from "@/lib/utils";
import prisma from "@/lib/prisma";

export async function scrapeTradeShows(): Promise<{
  success: boolean;
  data?: DraftFair[];
  error?: string;
}> {
  try {
    const url = "https://www.eventseye.com/fairs/c1_trade-shows_china.html";

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);

    const html = await response.text();
    const $ = cheerio.load(html);
    const draftFairs: DraftFair[] = [];

    $("table.tradeshows tbody tr").each((index, element) => {
      const row = $(element);

      // 1. İSİM ve AÇIKLAMA
      const titleCell = row.find("td").eq(0);
      const anchor = titleCell.find("a");
      const name = anchor.find("b").text().trim();
      const description = anchor.find("i").text().trim(); // Prisma 'description'

      // Linki 'website' alanına koyalım
      const relativeLink = anchor.attr("href");
      const website = relativeLink
        ? `https://www.eventseye.com/fairs/${relativeLink}`
        : null;

      // 2. MEKAN (Venue)
      const venueCell = row.find("td").eq(2);
      const venue = venueCell.text().replace(/\s\s+/g, " ").trim();

      // 3. TARİH ve SÜRE
      const dateCell = row.find("td").eq(3);
      const dateString = dateCell
        .contents()
        .filter((_, el) => el.type === "text")
        .text()
        .trim(); // "10/14/2025"
      const durationString = dateCell.find("i").text().trim(); // "3 days"

      // Tarih Parsing İşlemi
      // Not: Sadece kesin tarihi olanları alıyoruz. "March 2026" gibi olanları atlıyoruz (Prisma zorunlu alan hatası vermesin diye)
      const startDate = new Date(dateString);

      // Geçerli bir tarih mi kontrol et
      if (!isNaN(startDate.getTime())) {
        // Süreyi hesapla (Varsayılan 1 gün)
        const durationMatch = durationString.match(/(\d+)/);
        const days = durationMatch ? parseInt(durationMatch[1]) : 1;
        const endDate = addDays(startDate, days);

        // Slug oluştur (Benzersizlik için yıl eklenebilir)
        const year = startDate.getFullYear();
        const generatedSlug = slugify(`${name}-${year}`);

        if (name) {
          draftFairs.push({
            id: `draft-${index}`, // UI için geçici ID
            name,
            slug: generatedSlug,
            description, // Prisma'da description
            venue, // Prisma'da venue
            website, // Prisma'da website
            startDate, // Prisma'da startDate
            endDate, // Prisma'da endDate
            status: "Beklemede",
          });
        }
      }
    });

    return { success: true, data: draftFairs };
  } catch (error) {
    console.error("Scraping Error:", error);
    return { success: false, error: "Veri çekilemedi." };
  }
}

export async function saveTradeShow(fairData: DraftFair) {
  try {
    // UI için kullandığımız geçici ID'yi veritabanına göndermiyoruz.
    // Prisma kendi UUID'sini oluşturacak.

    const { id, ...dataToSave } = fairData;

    const newFair = await prisma.fair.create({
      data: {
        name: dataToSave.name,
        slug: dataToSave.slug,
        description: dataToSave.description,
        venue: dataToSave.venue,
        website: dataToSave.website,
        startDate: dataToSave.startDate,
        endDate: dataToSave.endDate,
        status: "Beklemede",
        // Prisma modelindeki diğer alanlar default değerlerini alacak
      },
    });

    console.log("Prisma Modeline Uygun Kayıt:", {
      name: fairData.name,
      slug: fairData.slug,
      start: fairData.startDate,
      end: fairData.endDate,
    });

    return { success: true, message: "Fuar veritabanına eklendi." };
  } catch (error) {
    return { success: false, message: "Veritabanı hatası." };
  }
}
