import GalleryForm from "@/features/galleries/components/gallery-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewGalleryPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/galleries">
          <Button variant="outline" size="icon" title="Geri Dön">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Yeni Galeri Oluştur
          </h1>
          <p className="text-muted-foreground">
            Fuar veya turlarda kullanılmak üzere yeni bir fotoğraf koleksiyonu
            oluşturun.
          </p>
        </div>
      </div>

      {/* Render the Form Component */}
      <GalleryForm />
    </div>
  );
}
