"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[]; // We use array to keep it compatible with galleries, even if profile is single
}

export default function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) return null;

  // If we have an image, show it with a remove button
  if (value && value.length > 0) {
    return (
      <div className="flex items-center gap-4">
        <Avatar className="h-24 w-24 border-2 border-slate-200">
          <AvatarImage src={value[0]} className="object-cover" />
          <AvatarFallback className="bg-slate-100">IMG</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            onClick={() => onRemove(value[0])}
            variant="destructive"
            size="sm"
          >
            <Trash className="h-4 w-4 mr-2" />
            Fotoğrafı Kaldır
          </Button>
          <p className="text-xs text-muted-foreground">
            Yeni bir fotoğraf yüklemek için önce mevcut olanı kaldırın.
          </p>
        </div>
      </div>
    );
  }

  // Otherwise show upload button
  return (
    <CldUploadWidget
      onUpload={onUpload}
      uploadPreset="fuarlarim2026" // Replace with your Cloudinary Unsigned Preset
    >
      {({ open }) => {
        const onClick = () => {
          open();
        };

        return (
          <Button
            type="button"
            disabled={disabled}
            variant="secondary"
            onClick={onClick}
          >
            <ImagePlus className="h-4 w-4 mr-2" />
            Fotoğraf Yükle
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}
