"use client";

import { useActionState, useState } from "react";
import { createFairAction, updateFairAction } from "@/features/fairs/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Activity, Fair, TravelPackage } from "@/app/generated/prisma/client";
import ImageUpload from "@/components/shared/image-upload";
import PackageManager from "./packages/package-manager";
import { FAIR_CATEGORIES, FAIR_TYPES } from "@/lib/constants";

// DB Types

// --- TYPES ---

type FairWithRelations = Fair & {
  packages: (TravelPackage & { activities: Activity[] })[];
};

type SelectOption = {
  id: string;
  name: string;
};

// Re-using the PackageState type for consistency
type PackageState = {
  tempId: number;
  name: string;
  duration: string;
  description: string;
  priceSingle: number;
  priceDouble: number;
  activities: { dayNumber: number; description: string }[];
};

interface FairFormProps {
  hotelOptions: SelectOption[];
  galleryOptions: SelectOption[];
  initialData?: FairWithRelations | null;
}

export default function FairForm({
  hotelOptions,
  galleryOptions,
  initialData,
}: FairFormProps) {
  // --- 1. SETUP ACTIONS (Create vs Update) ---
  const actionToUse = initialData
    ? updateFairAction.bind(null, initialData.id)
    : createFairAction;

  const [state, formAction] = useActionState(actionToUse, null);

  // --- 2. INITIALIZE STATE (Pre-fill if Edit Mode) ---
  // Media
  const [logoUrl, setLogoUrl] = useState(initialData?.logoUrl || "");
  const [bannerUrl, setBannerUrl] = useState(initialData?.bannerUrl || "");

  // Tags
  const [products, setProducts] = useState<string[]>(
    initialData?.products || []
  );
  const [services, setServices] = useState<string[]>(
    initialData?.services || []
  );
  const [freeServices, setFreeServices] = useState<string[]>(
    initialData?.freeServices || []
  );

  // Packages (Transform DB Data to UI State)
  const [packages, setPackages] = useState<PackageState[]>(
    initialData?.packages.map((pkg) => ({
      tempId: Math.random(), // Frontend-only ID for React Keys
      name: pkg.name,
      duration: pkg.duration || "",
      description: pkg.description || "",
      priceSingle: pkg.priceSingle || 0,
      priceDouble: pkg.priceDouble || 0,
      activities: pkg.activities
        .map((act) => ({
          dayNumber: act.dayNumber,
          description: act.description,
        }))
        .sort((a, b) => a.dayNumber - b.dayNumber),
    })) || []
  );

  // Helper for Tag Inputs
  const handleAddTag = (
    e: React.KeyboardEvent<HTMLInputElement>,
    list: string[],
    setList: Function
  ) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Stop form submission
      const val = e.currentTarget.value.trim();
      if (val && !list.includes(val)) {
        setList([...list, val]);
        e.currentTarget.value = "";
      }
    }
  };

  // HELPER: Convert null/undefined database values to our specific "unassigned" string
  // If initialData.hotelId is null, we return "unassigned" so the dropdown shows "Seçim Yok"
  const getValue = (val?: string | null) => val || "unassigned";

  return (
    <form action={formAction} className="space-y-10 pb-20">
      {/* Global Error Display */}
      {state?.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
          <p className="font-bold">Hata:</p>
          <p>{state.error}</p>
        </div>
      )}

      {/* --- HIDDEN INPUTS (Serialize React State for Server Action) --- */}
      <input type="hidden" name="logoUrl" value={logoUrl} />
      <input type="hidden" name="bannerUrl" value={bannerUrl} />
      <input type="hidden" name="products" value={JSON.stringify(products)} />
      <input type="hidden" name="services" value={JSON.stringify(services)} />
      <input
        type="hidden"
        name="freeServices"
        value={JSON.stringify(freeServices)}
      />
      <input type="hidden" name="packages" value={JSON.stringify(packages)} />

      {/* --- SECTION 1: GENERAL INFORMATION --- */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Genel Bilgiler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Fuar Adı</Label>
            <Input
              id="name"
              name="name"
              placeholder="Örn: Global Tekstil Fuarı 2026"
              defaultValue={initialData?.name}
              required
            />
            {state?.fieldErrors?.name && (
              <p className="text-red-500 text-xs">{state.fieldErrors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug (benzersiz)</Label>
            <Input
              id="slug"
              name="slug"
              placeholder="orn-global-tekstil-2026"
              defaultValue={initialData?.slug}
              required
            />
            {state?.fieldErrors?.slug && (
              <p className="text-red-500 text-xs">{state.fieldErrors.slug}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue">Fuar Alanı / Şehir</Label>
            <Input
              id="venue"
              name="venue"
              placeholder="Örn: Shanghai New Expo Centre"
              defaultValue={initialData?.venue || ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Web Sitesi</Label>
            <Input
              id="website"
              name="website"
              placeholder="https://..."
              defaultValue={initialData?.website || ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Başlangıç Tarihi</Label>
            <Input
              type="date"
              id="startDate"
              name="startDate"
              defaultValue={
                initialData?.startDate
                  ? new Date(initialData.startDate).toISOString().split("T")[0]
                  : ""
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">Bitiş Tarihi</Label>
            <Input
              type="date"
              id="endDate"
              name="endDate"
              defaultValue={
                initialData?.endDate
                  ? new Date(initialData.endDate).toISOString().split("T")[0]
                  : ""
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Durum</Label>
            <Select
              name="status"
              defaultValue={initialData?.status || "Beklemede"}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beklemede">Beklemede</SelectItem>
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Pasif">Pasif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kategori Seçimi */}
          <div className="space-y-2">
            <Label htmlFor="category">Fuar Kategorisi</Label>
            <Select name="category" defaultValue={initialData?.category || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Kategori seçin..." />
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

          {/* Tip Seçimi */}
          <div className="space-y-2">
            <Label htmlFor="type">Fuar Tipi</Label>
            <Select name="type" defaultValue={initialData?.type || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Tip seçin..." />
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Genel Açıklama</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Fuar hakkında detaylı bilgi..."
            className="h-32"
            defaultValue={initialData?.description}
            required
          />
          {state?.fieldErrors?.description && (
            <p className="text-red-500 text-xs">
              {state.fieldErrors.description}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Kısa Özet (Opsiyonel)</Label>
          <Textarea
            id="summary"
            name="summary"
            placeholder="Listeleme sayfalarında görünecek kısa açıklama."
            defaultValue={initialData?.summary || ""}
          />
        </div>
      </div>

      <hr />

      {/* --- SECTION 2: BOOLEAN SWITCHES --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label>Yayınla</Label>
            <div className="text-xs text-muted-foreground">
              Web sitesinde görünür
            </div>
          </div>
          <Switch
            name="isPublished"
            defaultChecked={initialData?.isPublished}
          />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label>Öne Çıkar</Label>
            <div className="text-xs text-muted-foreground">
              Anasayfada göster
            </div>
          </div>
          <Switch name="isFeatured" defaultChecked={initialData?.isFeatured} />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label>Kesin Hareket</Label>
            <div className="text-xs text-muted-foreground">
              Gidiş garantili mi?
            </div>
          </div>
          <Switch
            name="isDefiniteDeparture"
            defaultChecked={initialData?.isDefiniteDeparture}
          />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label>Sektörel</Label>
            <div className="text-xs text-muted-foreground">
              Sektörel fuar mı?
            </div>
          </div>
          <Switch name="isSectoral" defaultChecked={initialData?.isSectoral} />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label>Bannerda Göster</Label>
            <div className="text-xs text-muted-foreground">
              Ana sliderda yer al
            </div>
          </div>
          <Switch
            name="displayOnBanner"
            defaultChecked={initialData?.displayOnBanner}
          />
        </div>
      </div>

      <hr />

      {/* --- SECTION 3: RELATIONS (Dropdowns) --- */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Bağlantılar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Konaklama (Otel)</Label>
            {/* 1. Use getValue helper for defaultValue */}
            <Select
              name="hotelId"
              defaultValue={getValue(initialData?.hotelId)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Otel Seçiniz" />
              </SelectTrigger>
              <SelectContent>
                {/* 2. Change value="" to value="unassigned" */}
                <SelectItem value="unassigned">Seçim Yok</SelectItem>
                {hotelOptions.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id}>
                    {opt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tur Galerisi</Label>
            <Select
              name="tourGalleryId"
              defaultValue={getValue(initialData?.tourGalleryId)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Galeri Seçiniz" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Seçim Yok</SelectItem>
                {galleryOptions.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id}>
                    {opt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Fuar Alanı Galerisi</Label>
            <Select
              name="venueGalleryId"
              defaultValue={getValue(initialData?.venueGalleryId)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Galeri Seçiniz" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Seçim Yok</SelectItem>
                {galleryOptions.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id}>
                    {opt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Genel Fuar Galerisi</Label>
            <Select
              name="fairGalleryId"
              defaultValue={getValue(initialData?.fairGalleryId)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Galeri Seçiniz" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Seçim Yok</SelectItem>
                {galleryOptions.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id}>
                    {opt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <hr />

      {/* --- SECTION 4: MEDIA UPLOADS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label>Logo Görseli</Label>
          <div className="bg-slate-50 border border-dashed rounded-md p-4">
            <ImageUpload
              value={logoUrl ? [logoUrl] : []}
              onChange={(url) => setLogoUrl(url)}
              onRemove={() => setLogoUrl("")}
            />
          </div>
        </div>
        <div className="space-y-4">
          <Label>Banner Görseli (Geniş)</Label>
          <div className="bg-slate-50 border border-dashed rounded-md p-4">
            <ImageUpload
              value={bannerUrl ? [bannerUrl] : []}
              onChange={(url) => setBannerUrl(url)}
              onRemove={() => setBannerUrl("")}
            />
          </div>
        </div>
      </div>

      <hr />

      {/* --- SECTION 5: TAGS --- */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Etiketler</h3>
        <p className="text-sm text-muted-foreground">
          Enter tuşuna basarak ekleyin.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Products */}
          <div className="space-y-2">
            <Label>Sergilenen Ürün Grupları</Label>
            <Input
              placeholder="Örn: Tekstil Makineleri (Enter'a bas)"
              onKeyDown={(e) => handleAddTag(e, products, setProducts)}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {products.map((tag, i) => (
                <Badge key={i} variant="secondary" className="px-3 py-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() =>
                      setProducts(products.filter((p) => p !== tag))
                    }
                    className="ml-2 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-2">
            <Label>Fiyata Dahil Hizmetler</Label>
            <Input
              placeholder="Örn: Uçak Bileti (Enter'a bas)"
              onKeyDown={(e) => handleAddTag(e, services, setServices)}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {services.map((tag, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 px-3 py-1 hover:bg-blue-100"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() =>
                      setServices(services.filter((p) => p !== tag))
                    }
                    className="ml-2 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Free Services */}
          <div className="space-y-2">
            <Label>Ücretsiz Hizmetler</Label>
            <Input
              placeholder="Örn: Rehberlik (Enter'a bas)"
              onKeyDown={(e) => handleAddTag(e, freeServices, setFreeServices)}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {freeServices.map((tag, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-green-50 text-green-700 px-3 py-1 hover:bg-green-100"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() =>
                      setFreeServices(freeServices.filter((p) => p !== tag))
                    }
                    className="ml-2 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* --- SECTION 6: PACKAGES (Nested Form) --- */}
      <PackageManager packages={packages} onChange={setPackages} />

      {/* --- SUBMIT --- */}
      <div className="flex justify-end pt-10 sticky bottom-0 bg-white p-4 border-t z-10 shadow-lg -mx-4 md:mx-0 rounded-t-lg">
        <Button type="submit" size="lg" className="w-full md:w-auto">
          {initialData ? "Değişiklikleri Kaydet" : "Fuarı Oluştur"}
        </Button>
      </div>
    </form>
  );
}
