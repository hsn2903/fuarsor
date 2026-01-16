import Link from "next/link";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Plus, Building2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HotelRowActions from "@/features/hotels/components/hotel-row-actions";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export default async function HotelsPage() {
  // Fetch Data with usage count
  const hotels = await prisma.hotel.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { fairs: true },
      },
    },
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Oteller</h1>
          <p className="text-muted-foreground mt-1">
            Fuar paketlerinde kullanılan konaklama seçenekleri.
          </p>
        </div>
        <Link href="/admin/hotels/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Yeni Otel Ekle
          </Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Otel Adı</TableHead>
              <TableHead>Açıklama</TableHead>
              <TableHead>Görsel Sayısı</TableHead>
              <TableHead>Kullanım Durumu</TableHead>
              <TableHead>Eklenme Tarihi</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotels.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Building2 className="h-8 w-8 opacity-50" />
                    <p>Henüz hiç otel eklenmemiş.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              hotels.map((hotel) => (
                <TableRow key={hotel.id}>
                  <TableCell className="font-medium text-base">
                    {hotel.name}
                  </TableCell>

                  <TableCell className="max-w-[300px]">
                    <span className="text-sm text-muted-foreground line-clamp-1">
                      {hotel.description || "-"}
                    </span>
                  </TableCell>

                  <TableCell>{hotel.imageUrls.length} Resim</TableCell>

                  <TableCell>
                    {hotel._count.fairs === 0 ? (
                      <span className="text-slate-400 text-sm">
                        Kullanılmıyor
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {hotel._count.fairs} Fuar
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {format(hotel.createdAt, "d MMMM yyyy", { locale: tr })}
                  </TableCell>

                  <TableCell className="text-right">
                    <HotelRowActions id={hotel.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
