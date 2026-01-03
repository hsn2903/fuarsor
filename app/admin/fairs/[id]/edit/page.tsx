import { notFound } from "next/navigation";
import FairForm from "@/features/fairs/components/fair-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";

interface EditFairPageProps {
  params: {
    id: string;
  };
}

export default async function EditFairPage({ params }: EditFairPageProps) {
  const { id } = params;

  // 1. Fetch the Fair with ALL nested data
  const fair = await prisma.fair.findUnique({
    where: { id },
    include: {
      packages: {
        include: { activities: true }, // We need activities too
        orderBy: { priceSingle: "asc" }, // Optional sort
      },
    },
  });

  if (!fair) {
    notFound(); // Returns a 404 page
  }

  // 2. Fetch Options for Dropdowns
  const hotels = await prisma.hotel.findMany({
    select: { id: true, name: true },
  });
  const galleries = await prisma.gallery.findMany({
    select: { id: true, name: true },
  });

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/fairs">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fuarı Düzenle</h1>
          <p className="text-muted-foreground">
            {fair.name} detaylarını güncelleyin.
          </p>
        </div>
      </div>

      {/* 3. Pass Data to Form */}
      <FairForm
        hotelOptions={hotels}
        galleryOptions={galleries}
        initialData={fair} // <--- The magic prop
      />
    </div>
  );
}
