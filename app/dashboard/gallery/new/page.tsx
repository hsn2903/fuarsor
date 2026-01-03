"use client";

import { useActionState, useState } from "react";
import { createGallery } from "@/app/_actions/gallery-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/shared/image-upload";

export default function CreateGalleryPage() {
  const [state, formAction] = useActionState(createGallery, null);
  const [images, setImages] = useState<string[]>([]);

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Create New Photo Gallery</h1>

      <form
        action={formAction}
        className="space-y-6 border p-6 rounded-lg bg-white shadow-sm"
      >
        {state?.error && <p className="text-red-500">{state.error}</p>}

        <input type="hidden" name="images" value={JSON.stringify(images)} />

        <div className="space-y-2">
          <Label>Gallery Name</Label>
          <Input
            name="name"
            placeholder="e.g. Best of China Tour 2026"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            name="description"
            placeholder="Photos from the city tour..."
          />
        </div>

        <div className="space-y-2">
          <Label>Upload Photos</Label>
          <ImageUpload
            value={images}
            onChange={(url) => setImages([...images, url])}
            onRemove={(url) => setImages(images.filter((i) => i !== url))}
          />
        </div>

        <Button type="submit">Save Gallery</Button>
      </form>
    </div>
  );
}
