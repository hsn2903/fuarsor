import { notFound } from "next/navigation";
import HotelForm from "@/features/hotels/components/hotel-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";

interface EditHotelPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditHotelPage({ params }: EditHotelPageProps) {
  const { id } = await params;

  const hotel = await prisma.hotel.findUnique({
    where: { id },
  });

  if (!hotel) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/hotels">
          <Button variant="outline" size="icon" title="Listeye Dön">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Oteli Düzenle</h1>
          <p className="text-muted-foreground">
            {hotel.name} bilgilerini güncelleyin.
          </p>
        </div>
      </div>

      <HotelForm initialData={hotel} />
    </div>
  );
}
