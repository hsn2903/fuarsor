"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  maxFiles?: number;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  maxFiles = 1,
}: ImageUploadProps) {
  // 1. SAFETY CHECK: Hydration Mismatch Fix
  // Next.js sometimes struggles rendering Client Components that rely heavily on browser APIs immediately.
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. SAFETY CHECK: Array Validation
  // If 'value' is null/undefined (database glitch) or a string (developer error), fallback to empty array.
  // This prevents the "map is not a function" crash.
  const safeValue = Array.isArray(value) ? value : [];

  // Prevent rendering until client is mounted to avoid hydration errors
  if (!isMounted) return null;

  const onUpload = (result: any) => {
    // Cloudinary returns the uploaded image URL in result.info.secure_url
    const url = result.info.secure_url;

    if (maxFiles === 1) {
      onChange([url]); // Replace entire array
    } else {
      onChange([...safeValue, url]); // Append to safe array
    }
  };

  return (
    <div>
      {/* Image Preview Grid */}
      <div className="mb-4 flex items-center gap-4 flex-wrap">
        {safeValue.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden border border-slate-200"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                // 3. FIX: Ensure onRemove receives the specific URL
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
                className="h-8 w-8"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Uploaded Image"
              src={url}
            />
          </div>
        ))}
      </div>

      {/* Upload Button */}
      {/* Only show if we haven't hit the limit */}
      {safeValue.length < maxFiles && (
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={onUpload}
          options={{
            maxFiles: maxFiles - safeValue.length,
            multiple: maxFiles > 1,
            resourceType: "image",
          }}
        >
          {({ open }) => {
            return (
              <Button
                type="button"
                variant="secondary"
                onClick={() => open()} // Trigger Cloudinary Widget
              >
                <ImagePlus className="h-4 w-4 mr-2" />
                {maxFiles > 1 ? "Upload Images" : "Upload Cover Image"}
              </Button>
            );
          }}
        </CldUploadWidget>
      )}
    </div>
  );
}
