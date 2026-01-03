"use client";

import { useActionState, useState } from "react";
import { createHotelAction } from "@/features/hotels/actions"; // Import from Ch 7
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/shared/image-upload"; // Reused component

export default function HotelForm() {
  // Connect to Server Action
  const [state, formAction, isPending] = useActionState(
    createHotelAction,
    null
  );

  // Local state for images
  const [images, setImages] = useState<string[]>([]);

  return (
    <form
      action={formAction}
      className="space-y-8 max-w-3xl border p-6 rounded-lg bg-white shadow-sm"
    >
      {/* Error Message */}
      {state?.error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md border border-red-200 text-sm font-medium">
          {state.error}
        </div>
      )}

      {/* Hidden Input for Images */}
      <input type="hidden" name="imageUrls" value={JSON.stringify(images)} />

      {/* Hotel Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Otel Adı</Label>
        <Input
          id="name"
          name="name"
          placeholder="Örn: Grand Hyatt Shanghai"
          required
        />
        {state?.fieldErrors?.name && (
          <p className="text-red-500 text-xs">{state.fieldErrors.name}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Otel Açıklaması</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Konumu, yıldız sayısı ve imkanları hakkında bilgi..."
          className="h-32"
        />
      </div>

      {/* Image Uploader */}
      <div className="space-y-2">
        <Label>Otel Görselleri</Label>
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
          {images.length === 0
            ? "Henüz görsel yüklenmedi."
            : `${images.length} adet görsel seçildi.`}
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t">
        <Button type="submit" disabled={isPending} className="w-full md:w-auto">
          {isPending ? "Kaydediliyor..." : "Oteli Kaydet"}
        </Button>
      </div>
    </form>
  );
}
