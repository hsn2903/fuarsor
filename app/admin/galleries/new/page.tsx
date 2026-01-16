import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import GalleryForm from "@/features/galleries/components/gallery-form"; // Import form from Ch 6

export default function NewGalleryPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        {/* Back Button */}
        <Link href="/admin/galleries">
          <Button variant="outline" size="icon" title="Listeye Dön">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>

        {/* Title & Subtitle */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Yeni Galeri Oluştur
          </h1>
          <p className="text-muted-foreground">
            Oteller veya fuarlar için kullanılacak yeni bir fotoğraf koleksiyonu
            ekleyin.
          </p>
        </div>
      </div>

      {/* The Form */}
      <GalleryForm />
    </div>
  );
}
