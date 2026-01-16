import FairForm from "@/features/fairs/components/fair-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function NewFairPage() {
  // 1. Fetch Options for Dropdowns
  // We need to pass these to the form so the user can select them.
  const hotels = await prisma.hotel.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  const galleries = await prisma.gallery.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/fairs">
          <Button variant="outline" size="icon" title="Listeye Dön">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Yeni Fuar Ekle</h1>
          <p className="text-muted-foreground">
            Sisteme yeni bir fuar organizasyonu ve tur paketi ekleyin.
          </p>
        </div>
      </div>

      {/* The Form */}
      <FairForm hotelOptions={hotels} galleryOptions={galleries} />
    </div>
  );
}
