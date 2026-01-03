"use client";

import { useActionState, useState } from "react";
import { createFairAction } from "@/features/fairs/actions"; // Ensure this path is correct
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
// Adjust these import paths to match your project structure
import { SelectOption, PackageState } from "../types";
import TagInput from "./tag-input";
import ImageUpload from "@/components/shared/image-upload";
import PackageManager from "./packages/package-manager";
import { Activity, Fair, TravelPackage } from "@/app/generated/prisma/client";

// --- TYPE DEFINITIONS ---
// Defined once and used for the Props
type FairWithRelations = Fair & {
  packages: (TravelPackage & { activities: Activity[] })[];
};

interface FairFormProps {
  hotelOptions: SelectOption[];
  galleryOptions: SelectOption[];
  initialData?: FairWithRelations | null; // Support for Edit Mode
}

export default function FairForm({
  hotelOptions,
  galleryOptions,
  initialData,
}: FairFormProps) {
  // Server Action Hook
  const [state, formAction, isPending] = useActionState(createFairAction, null);

  // --- 1. LOCAL STATE ---
  // We only keep state for complex fields (Arrays, Images, Nested Objects).
  // Simple fields (Strings, IDs) are handled natively by the form.

  // Tags
  const [products, setProducts] = useState<string[]>(
    initialData?.displayedProducts
      ? (initialData.displayedProducts as string[])
      : []
  );
  const [services, setServices] = useState<string[]>(
    initialData?.paidServices ? (initialData.paidServices as string[]) : []
  );
  const [freeServices, setFreeServices] = useState<string[]>(
    initialData?.freeServices ? (initialData.freeServices as string[]) : []
  );

  // Media (We store the URL string here to pass to the hidden input)
  const [logoUrl, setLogoUrl] = useState(initialData?.logoImage || "");
  const [bannerUrl, setBannerUrl] = useState(initialData?.bannerImage || "");

  // Packages (Complex Nested State)
  // Note: If editing, you would need a mapper here to convert Prisma structure to PackageState structure.
  // For now, we initialize empty or with existing data if mapped.
  const [packages, setPackages] = useState<PackageState[]>([]);

  return (
    <form action={formAction} className="space-y-10 pb-20">
      {/* --- ERROR MESSAGE --- */}
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md">
          <p className="font-bold">Hata:</p>
          <p>{state.error}</p>
        </div>
      )}

      {/* --- HIDDEN INPUTS (The Bridge) --- */}
      {/* Only for the state-managed fields above */}
      <input type="hidden" name="products" value={JSON.stringify(products)} />
      <input type="hidden" name="services" value={JSON.stringify(services)} />
      <input
        type="hidden"
        name="freeServices"
        value={JSON.stringify(freeServices)}
      />
      <input type="hidden" name="packages" value={JSON.stringify(packages)} />

      <input type="hidden" name="logoUrl" value={logoUrl} />
      <input type="hidden" name="bannerUrl" value={bannerUrl} />

      {/* --- SECTION 1: GENERAL INFORMATION --- */}
      <div className="space-y-6 border p-6 rounded-lg bg-white shadow-sm">
        <h2 className="text-xl font-bold tracking-tight">Genel Bilgiler</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Fuar Adı <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              defaultValue={initialData?.name}
              placeholder="Örn: Expo 2026 Shanghai"
              required
            />
            {state?.fieldErrors?.name && (
              <p className="text-red-500 text-xs">{state.fieldErrors.name}</p>
            )}
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">
              URL Slug <span className="text-red-500">*</span>
            </Label>
            <Input
              id="slug"
              name="slug"
              defaultValue={initialData?.slug}
              placeholder="expo-2026-shanghai"
              required
            />
            {state?.fieldErrors?.slug && (
              <p className="text-red-500 text-xs">{state.fieldErrors.slug}</p>
            )}
          </div>

          {/* Venue */}
          <div className="space-y-2">
            <Label htmlFor="venue">Fuar Alanı / Şehir</Label>
            <Input
              id="venue"
              name="venue"
              defaultValue={initialData?.venue || ""}
              placeholder="Shanghai, Çin"
            />
          </div>

          {/* Website */}
          <div className="space-y-2">
            <Label htmlFor="website">Web Sitesi</Label>
            <Input
              id="website"
              name="website"
              defaultValue={initialData?.website || ""}
              placeholder="https://..."
            />
            {state?.fieldErrors?.website && (
              <p className="text-red-500 text-xs">
                {state.fieldErrors.website}
              </p>
            )}
          </div>

          {/* Dates */}
          {/* We format Date objects to YYYY-MM-DD for the input */}
          <div className="space-y-2">
            <Label htmlFor="startDate">
              Başlangıç Tarihi <span className="text-red-500">*</span>
            </Label>
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
            <Label htmlFor="endDate">
              Bitiş Tarihi <span className="text-red-500">*</span>
            </Label>
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

          {/* Status (Dropdown) */}
          <div className="space-y-2">
            <Label htmlFor="status">Durum</Label>
            <Select
              name="status"
              defaultValue={initialData?.status || "Beklemede"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seçiniz" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beklemede">Beklemede</SelectItem>
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Pasif">Pasif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Text Areas */}
        <div className="space-y-2">
          <Label htmlFor="description">
            Detaylı Açıklama <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={initialData?.description || ""}
            placeholder="Fuar hakkında detaylı bilgi..."
            className="h-32"
            required
          />
          {state?.fieldErrors?.description && (
            <p className="text-red-500 text-xs">
              {state.fieldErrors.description}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Kısa Özet (Liste görünümü için)</Label>
          <Textarea
            id="summary"
            name="summary"
            defaultValue={initialData?.summary || ""}
            placeholder="Kısa özet..."
          />
        </div>
      </div>

      {/* --- SECTION 2: SETTINGS (Switches) --- */}
      {/* Switches in Shadcn usually need a hidden input or defaultValue handling if using FormData directly. 
          Standard Shadcn Switch uses 'checked' state. 
          To make this work with FormData without state, we use defaultChecked + name.
      */}
      <div className="space-y-6 border p-6 rounded-lg bg-white shadow-sm">
        <h2 className="text-xl font-bold tracking-tight">
          Ayarlar & Görünürlük
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 border p-4 rounded-md">
            <Switch
              name="isPublished"
              defaultChecked={initialData?.isPublished}
            />
            <Label>Yayında</Label>
          </div>
          <div className="flex items-center gap-3 border p-4 rounded-md">
            <Switch
              name="isFeatured"
              defaultChecked={initialData?.isFeatured}
            />
            <Label>Öne Çıkan</Label>
          </div>
          <div className="flex items-center gap-3 border p-4 rounded-md">
            <Switch
              name="displayOnBanner"
              defaultChecked={initialData?.displayOnBanner}
            />
            <Label>Banner'da Göster</Label>
          </div>
          <div className="flex items-center gap-3 border p-4 rounded-md">
            <Switch
              name="isSectoral"
              defaultChecked={initialData?.isSectoral}
            />
            <Label>Sektörel Fuar</Label>
          </div>
          <div className="flex items-center gap-3 border p-4 rounded-md">
            <Switch
              name="isDefiniteDeparture"
              defaultChecked={initialData?.isDefiniteDeparture}
            />
            <Label>Kesin Hareketli</Label>
          </div>
        </div>
      </div>

      {/* --- SECTION 3: MEDIA (Logo & Banner) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-6 rounded-lg bg-white shadow-sm">
        <h2 className="text-xl font-bold tracking-tight col-span-2">
          Medya Görselleri
        </h2>

        {/* Logo Upload */}
        <div className="space-y-4">
          <Label>Fuar Logosu</Label>
          <div className="bg-slate-50 p-4 rounded-md border border-dashed">
            <ImageUpload
              value={logoUrl ? [logoUrl] : []}
              onChange={(url) => setLogoUrl(url)}
              onRemove={() => setLogoUrl("")}
            />
          </div>
        </div>

        {/* Banner Upload */}
        <div className="space-y-4">
          <Label>Fuar Banner (Yatay)</Label>
          <div className="bg-slate-50 p-4 rounded-md border border-dashed">
            <ImageUpload
              value={bannerUrl ? [bannerUrl] : []}
              onChange={(url) => setBannerUrl(url)}
              onRemove={() => setBannerUrl("")}
            />
          </div>
        </div>
      </div>

      {/* --- SECTION 4: RELATIONS (Hotel & Galleries) --- */}
      <div className="space-y-6 border p-6 rounded-lg bg-white shadow-sm">
        <h2 className="text-xl font-bold tracking-tight">
          İlişkiler & Bağlantılar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* HOTEL SELECT */}
          <div className="space-y-2">
            <Label>Konaklama (Otel)</Label>
            {/* Added 'name' and 'defaultValue' */}
            <Select
              name="hotelId"
              defaultValue={initialData?.hotelId || "no-selection"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Otel Seçiniz..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-selection">(Seçim Yok)</SelectItem>
                {hotelOptions.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id}>
                    {opt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Listede yok mu?{" "}
              <a
                href="/admin/hotels/new"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Yeni Otel Ekle
              </a>
            </p>
          </div>

          {/* TOUR GALLERY SELECT */}
          <div className="space-y-2">
            <Label>Tur Galeri (Şehir/Gezi)</Label>
            <Select
              name="tourGalleryId"
              defaultValue={initialData?.tourGalleryId || "no-selection"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Galeri Seçiniz..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-selection">(Seçim Yok)</SelectItem>
                {galleryOptions.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id}>
                    {opt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              <a
                href="/admin/galleries/new"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Yeni Galeri Ekle
              </a>
            </p>
          </div>

          {/* VENUE GALLERY SELECT */}
          <div className="space-y-2">
            <Label>Fuar Alanı Galeri</Label>
            <Select
              name="venueGalleryId"
              defaultValue={initialData?.venueGalleryId || "no-selection"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Galeri Seçiniz..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-selection">(Seçim Yok)</SelectItem>
                {galleryOptions.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id}>
                    {opt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* FAIR GALLERY SELECT */}
          <div className="space-y-2">
            <Label>Genel Fuar Görselleri</Label>
            <Select
              name="fairGalleryId"
              defaultValue={initialData?.fairGalleryId || "no-selection"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Galeri Seçiniz..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-selection">(Seçim Yok)</SelectItem>
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

      {/* --- SECTION 5: TAGS (Lists) --- */}
      <div className="space-y-6 border p-6 rounded-lg bg-white shadow-sm">
        <h2 className="text-xl font-bold tracking-tight">
          Etiketler & Hizmetler
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Sergilenen Ürünler</Label>
            <TagInput
              placeholder="Örn: Tekstil, İplik..."
              tags={products}
              setTags={setProducts}
            />
          </div>
          <div className="space-y-2">
            <Label>Dahil Olan Hizmetler</Label>
            <TagInput
              placeholder="Örn: Uçak Bileti..."
              tags={services}
              setTags={setServices}
            />
          </div>
          <div className="space-y-2">
            <Label>Ücretsiz Hizmetler</Label>
            <TagInput
              placeholder="Örn: Rehberlik..."
              tags={freeServices}
              setTags={setFreeServices}
            />
          </div>
        </div>
      </div>

      {/* --- SECTION 6: PACKAGES --- */}
      <PackageManager packages={packages} setPackages={setPackages} />

      {/* SUBMIT BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t flex justify-end gap-4 shadow-lg z-50">
        <Button type="button" variant="outline">
          İptal
        </Button>
        <Button type="submit" size="lg" disabled={isPending}>
          {isPending ? "Oluşturuluyor..." : "Fuarı Oluştur"}
        </Button>
      </div>
    </form>
  );
}
