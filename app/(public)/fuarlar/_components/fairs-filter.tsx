"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createSearchParams } from "@/lib/search-utils";
import { Search, X } from "lucide-react";
import { FAIR_CATEGORIES, FAIR_TYPES } from "@/lib/constants";

interface FairsFilterProps {
  initialFilters: {
    fuarIsmi?: string;
    fuarKategori?: string;
    fuarTur?: string;
  };
  // categories: string[];
  // fairTypes: string[];
}

export default function FairsFilter({
  initialFilters,
}: // categories,
// fairTypes,
FairsFilterProps) {
  const router = useRouter();
  const [filters, setFilters] = useState({
    fuarIsmi: initialFilters.fuarIsmi || "",
    fuarKategori: initialFilters.fuarKategori || "",
    fuarTur: initialFilters.fuarTur || "",
  });

  const handleSearch = () => {
    const params = createSearchParams({
      fuarIsmi: filters.fuarIsmi,
      fuarKategori: filters.fuarKategori,
      fuarTur: filters.fuarTur,
    });

    router.push(`/fuarlar?${params.toString()}`);
  };

  const handleReset = () => {
    setFilters({
      fuarIsmi: "",
      fuarKategori: "",
      fuarTur: "",
    });
    router.push("/fuarlar");
  };

  return (
    <div className="bg-white dark:bg-gray-800 px-6 w-full md:w-1/4">
      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="fairName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Fuar Adı
          </label>
          <Input
            id="fairName"
            placeholder="Fuar adını girin"
            value={filters.fuarIsmi}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                fuarIsmi: e.target.value,
              }))
            }
            className="w-full"
          />
        </div>

        <div>
          <label
            htmlFor="fairCategory"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Fuar Kategorisi
          </label>
          <Select
            value={filters.fuarKategori}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                fuarKategori: value,
              }))
            }
          >
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue placeholder="Kategori Seçin" />
            </SelectTrigger>
            <SelectContent>
              {FAIR_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label
            htmlFor="fairType"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Fuar Türü
          </label>
          <Select
            value={filters.fuarTur}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                fuarTur: value,
              }))
            }
          >
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue placeholder="Tür Seçin" />
            </SelectTrigger>
            <SelectContent>
              {FAIR_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-x-4 flex items-center mt-6">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center cursor-pointer"
          >
            <X className="mr-2 h-4 w-4" /> Sıfırla
          </Button>
          <Button
            onClick={handleSearch}
            className="flex items-center cursor-pointer"
          >
            <Search className="mr-2 h-4 w-4" /> Ara
          </Button>
        </div>
      </div>
    </div>
  );
}
