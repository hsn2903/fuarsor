"use client";

import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

interface ProfileImageUploadProps {
  currentImage?: string | null;
  name: string;
  onImageChange: (base64: string) => void;
}

export default function ProfileImageUpload({
  currentImage,
  name,
  onImageChange,
}: ProfileImageUploadProps) {
  const [preview, setPreview] = useState(currentImage || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 2MB for Base64 storage safety)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Dosya boyutu 2MB'dan küçük olmalıdır.");
      return;
    }

    setIsUploading(true);

    // Convert to Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreview(base64String);
      onImageChange(base64String); // Pass data back to parent
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-6">
      <div className="relative group cursor-pointer" onClick={triggerClick}>
        <Avatar className="h-24 w-24 border-2 border-slate-200 transition group-hover:opacity-75">
          <AvatarImage src={preview} className="object-cover" />
          <AvatarFallback className="text-2xl font-bold bg-slate-100 text-slate-500">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Hover Overlay Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <Camera className="h-8 w-8 text-slate-800" />
        </div>

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Profil Fotoğrafı</h3>
        <p className="text-xs text-muted-foreground max-w-[200px]">
          JPG, GIF veya PNG. Maksimum 2MB.
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={triggerClick}
          >
            <Upload className="mr-2 h-3 w-3" /> Fotoğraf Yükle
          </Button>
          {/* Hidden Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}
