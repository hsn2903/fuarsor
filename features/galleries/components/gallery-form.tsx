"use client"; // This component needs interactivity (state, onClick), so it must be a Client Component.

import { useActionState, useState } from "react";
import { createGalleryAction } from "@/features/galleries/actions"; // Import the server action from Ch 4
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
import ImageUpload from "@/components/shared/image-upload"; // Import the uploader from Ch 3

export default function GalleryForm() {
  // Hook to connect our form to the Server Action.
  // state: holds the return value from the server (e.g. { error: "Name too short" })
  // formAction: the function to call when submitting
  // isPending: true while the action is running
  const [state, formAction, isPending] = useActionState(
    createGalleryAction,
    null
  );

  // --- LOCAL STATE ---
  // We need local state for complex inputs that don't map 1-to-1 with HTML inputs.
  const [images, setImages] = useState<string[]>([]);
  const [type, setType] = useState("GENERAL");

  return (
    <form
      action={formAction}
      className="space-y-8 max-w-3xl border p-6 rounded-lg bg-white shadow-sm"
    >
      {/* 1. Error Message Display */}
      {/* If the server returns an error, we show it here in a red box */}
      {state?.error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md border border-red-200 text-sm font-medium">
          {state.error}
        </div>
      )}

      {/* 2. HIDDEN INPUTS ( The Bridge ) */}
      {/* This is how we pass the React State data to the Server Action via FormData */}
      <input type="hidden" name="imageUrls" value={JSON.stringify(images)} />
      <input type="hidden" name="type" value={type} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Input */}
        <div className="space-y-2">
          <Label htmlFor="name">Galeri Adı</Label>
          <Input
            id="name"
            name="name"
            placeholder="Örn: 2026 Shanghai Turu"
            required // Basic browser validation
          />
          {/* Field-specific error from Zod */}
          {state?.fieldErrors?.name && (
            <p className="text-red-500 text-xs">{state.fieldErrors.name}</p>
          )}
        </div>

        {/* Type Selection */}
        {/* Shadcn Select doesn't work like a native <select>, so we control it via state */}
        <div className="space-y-2">
          <Label>Kategori</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GENERAL">Genel</SelectItem>
              <SelectItem value="TOUR">Tur Görselleri</SelectItem>
              <SelectItem value="VENUE">Fuar Alanı</SelectItem>
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
          placeholder="Bu koleksiyon hakkında kısa bilgi..."
        />
      </div>

      {/* Image Uploader Section */}
      <div className="space-y-2">
        <Label>Görseller</Label>
        <div className="bg-slate-50 p-4 rounded-md border border-dashed">
          <ImageUpload
            value={images}
            onChange={(url) => setImages((prev) => [...prev, url])} // Add new URL to list
            onRemove={(url) =>
              setImages((prev) => prev.filter((i) => i !== url))
            } // Remove URL from list
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {images.length === 0
            ? "Henüz hiç görsel yüklenmedi."
            : `Toplam ${images.length} görsel seçildi.`}
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t">
        <Button type="submit" disabled={isPending} className="w-full md:w-auto">
          {isPending ? "Kaydediliyor..." : "Galeriyi Kaydet"}
        </Button>
      </div>
    </form>
  );
}
