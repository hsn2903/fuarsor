"use client";

import { useActionState, useState } from "react";
import { createHotel } from "@/app/_actions/hotel-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/shared/image-upload";

export default function CreateHotelPage() {
  const [state, formAction] = useActionState(createHotel, null);
  const [images, setImages] = useState<string[]>([]);

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Add New Hotel</h1>

      <form
        action={formAction}
        className="space-y-6 border p-6 rounded-lg bg-white shadow-sm"
      >
        {state?.error && <p className="text-red-500">{state.error}</p>}

        {/* Hidden input to transfer the Image Array to Server Action */}
        <input type="hidden" name="images" value={JSON.stringify(images)} />

        <div className="space-y-2">
          <Label>Hotel Name</Label>
          <Input name="name" placeholder="Grand Hyatt Shanghai" required />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea name="description" placeholder="Hotel details..." />
        </div>

        <div className="space-y-2">
          <Label>Hotel Images</Label>
          <ImageUpload
            value={images}
            onChange={(url) => setImages([...images, url])}
            onRemove={(url) => setImages(images.filter((i) => i !== url))}
          />
        </div>

        <Button type="submit">Save Hotel</Button>
      </form>
    </div>
  );
}
