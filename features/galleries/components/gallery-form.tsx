"use client";

import { useActionState, useState } from "react";
import {
  createGalleryAction,
  updateGalleryAction,
} from "@/features/galleries/actions"; // Import Update Action
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gallery } from "@/app/generated/prisma/client";
import ImageUpload from "@/components/shared/image-upload";

// Define Props
interface GalleryFormProps {
  initialData?: Gallery | null; // Optional: Only present in Edit mode
}

export default function GalleryForm({ initialData }: GalleryFormProps) {
  // 1. Determine Action (Create vs Update)
  // If we have initialData, we bind the ID to the update action.
  // "bind" creates a new function where the first argument (id) is pre-filled.
  const actionToUse = initialData
    ? updateGalleryAction.bind(null, initialData.id)
    : createGalleryAction;

  const [state, formAction] = useActionState(actionToUse, null);

  // 2. Local State for Images
  // Initialize with existing images if editing, or empty array if creating
  const [images, setImages] = useState<string[]>(initialData?.imageUrls || []);

  return (
    <form
      action={formAction}
      className="space-y-8 max-w-3xl border p-6 rounded-lg bg-white shadow-sm"
    >
      {state?.error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md border border-red-200 text-sm font-medium">
          {state.error}
        </div>
      )}

      {/* Hidden Input for Images */}
      <input type="hidden" name="imageUrls" value={JSON.stringify(images)} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Input */}
        <div className="space-y-2">
          <Label htmlFor="name">Galeri Adı</Label>
          <Input
            id="name"
            name="name"
            placeholder="Örn: Kapadokya Turu 2026"
            defaultValue={initialData?.name} // <--- PRE-FILL
            required
          />
          {state?.fieldErrors?.name && (
            <p className="text-red-500 text-xs">{state.fieldErrors.name}</p>
          )}
        </div>

        {/* Type Select */}
        <div className="space-y-2">
          <Label htmlFor="type">Galeri Türü</Label>
          <Select name="type" defaultValue={initialData?.type || "GENERAL"}>
            {" "}
            {/* <--- PRE-FILL */}
            <SelectTrigger>
              <SelectValue placeholder="Tür Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GENERAL">Genel</SelectItem>
              <SelectItem value="TOUR">Tur Görselleri</SelectItem>
              <SelectItem value="VENUE">Mekan / Fuar Alanı</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Açıklama</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Bu galeri ne hakkında?"
          defaultValue={initialData?.description || ""} // <--- PRE-FILL
          className="h-24"
        />
      </div>

      {/* Image Uploader */}
      <div className="space-y-2">
        <Label>Görseller</Label>
        <div className="bg-slate-50 p-4 rounded-md border border-dashed">
          <ImageUpload
            value={images}
            onChange={(url) => setImages((prev) => [...prev, url])}
            onRemove={(url) =>
              setImages((prev) => prev.filter((i) => i !== url))
            }
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {images.length} görsel seçildi.
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t">
        <Button type="submit" className="w-full md:w-auto">
          {initialData ? "Değişiklikleri Kaydet" : "Galeriyi Kaydet"}{" "}
          {/* <--- DYNAMIC TEXT */}
        </Button>
      </div>
    </form>
  );
}
