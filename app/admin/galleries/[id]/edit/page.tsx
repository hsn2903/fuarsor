import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import GalleryForm from "@/features/galleries/components/gallery-form"; // The smart form
import prisma from "@/lib/prisma";

interface EditGalleryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditGalleryPage({
  params,
}: EditGalleryPageProps) {
  // 1. Get the ID
  const { id } = await params;

  // 2. Fetch Data
  const gallery = await prisma.gallery.findUnique({
    where: { id },
  });

  // 3. Handle 404
  if (!gallery) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <Link href="/admin/galleries">
          <Button variant="outline" size="icon" title="Listeye Dön">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Galeriyi Düzenle
          </h1>
          <p className="text-muted-foreground">
            "{gallery.name}" detaylarını güncelleyin.
          </p>
        </div>
      </div>

      {/* The Form with Data */}
      <GalleryForm initialData={gallery} />
    </div>
  );
}
