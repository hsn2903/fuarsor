// app/(website)/components/search-form.tsx
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { FAIR_CATEGORIES, FAIR_TYPES } from "@/lib/constants";

// interface SearchFormProps {
//   categories: string[];
//   fairTypes: string[];
// }

export default function FilterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [type, setType] = useState(searchParams.get("fuarTur") || "");
  const [category, setCategory] = useState(
    searchParams.get("fuarKategori") || ""
  );
  const [name, setName] = useState(searchParams.get("fuarIsmi") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (name) params.set("fuarIsmi", name);
    if (category) params.set("fuarKategori", category);
    if (type) params.set("fuarTur", type);

    router.push(`/fuarlar?${params.toString()}`);
  };

  return (
    <Card className="w-full max-w-4xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-sm shadow-lg py-0">
      <CardContent className="p-6">
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-[4px] bg-[#ffffff70]"
        >
          <div className="space-y-2">
            {/* <label htmlFor="fairName" className="text-sm font-medium">
              Fuar Adı?
            </label> */}
            <Input
              id="fairName"
              name="fairName"
              placeholder="Fuar adı"
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            {/* <label htmlFor="fairType" className="text-sm font-medium">
              Fuar Türü
            </label> */}
            <Select value={type} onValueChange={setType}>
              <SelectTrigger
                id="fairType"
                className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-sm w-full"
              >
                <SelectValue placeholder="Fuar Türü Seçiniz" />
              </SelectTrigger>
              <SelectContent>
                {FAIR_TYPES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item} Fuarları
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {/* <label htmlFor="fairCategory" className="text-sm font-medium">
              Fuar Sektörleri
            </label> */}
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                id="fairCategory"
                className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-sm w-full"
              >
                <SelectValue placeholder="Fuar Sektörü Seçiniz" />
              </SelectTrigger>
              <SelectContent>
                {FAIR_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full rounded-sm">
            <Search className="mr-2 h-4 w-4" /> Fuar Ara
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
