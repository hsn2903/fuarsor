"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FAIR_SECTORS } from "@/lib/constants";
import { ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { FairCard } from "../fairs/fair-card";
import { Fair } from "@/app/generated/prisma/client";
import { getFeaturedFairs } from "@/app/_actions/fairs";

export default function FeaturedFairs() {
  // 1. State for Data and Selection
  const [fairs, setFairs] = useState<Fair[]>([]);
  const [activeCategory, setActiveCategory] = useState("tümü");
  const [isLoading, setIsLoading] = useState(true);

  // 2. Fetch Data on Mount (Client Side)
  useEffect(() => {
    const loadFairs = async () => {
      try {
        const data = await getFeaturedFairs();
        // @ts-ignore - In case of slight type mismatch with relations
        setFairs(data);
      } catch (error) {
        console.error("Failed to load featured fairs", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFairs();
  }, []);

  // 3. Filter Logic (Runs instantly when activeCategory changes)
  const filteredFairs =
    activeCategory === "tümü"
      ? fairs
      : fairs.filter((fair) => {
          // Robust check: trimming and optional chaining to prevent crashes
          return fair.category?.trim() === activeCategory;
        });

  return (
    <section className="py-16 bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* --- HEADER --- */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Sektörel Fuarlar
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Sektörünüze özel fuar ve etkinlikleri keşfedin
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="hover:shadow-md transition-shadow"
          >
            <Link href="/fuarlar">
              Tümünü Gör
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* --- FILTER BUTTONS --- */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            variant={activeCategory === "tümü" ? "default" : "outline"}
            onClick={() => setActiveCategory("tümü")}
            className="transition-all duration-200"
          >
            Tümü
          </Button>
          {FAIR_SECTORS.map((cat) => (
            <Button
              key={cat.label}
              variant={activeCategory === cat.label ? "default" : "outline"}
              onClick={() => setActiveCategory(cat.label)}
              className="transition-all duration-200"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* --- CONTENT AREA --- */}
        {isLoading ? (
          // Loading State
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : filteredFairs.length === 0 ? (
          // Empty State
          <section className="py-16 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p className="mb-4 font-medium">Sonuç Bulunamadı</p>
              <p>
                Şu anda <strong>{activeCategory}</strong> kategorisinde öne
                çıkan bir fuar bulunmamaktadır.
              </p>
            </div>
          </section>
        ) : (
          // Grid State
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in zoom-in duration-300">
            {filteredFairs.map((fair) => (
              <FairCard key={fair.id} fair={fair} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
