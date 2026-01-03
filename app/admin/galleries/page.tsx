import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, ImageIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { tr } from "date-fns/locale"; // Turkish locale for dates
import prisma from "@/lib/prisma";
import GalleryRowActions from "@/features/galleries/components/gallery-row-ations";

// This is an async Server Component.
// We can await database calls directly!
export default async function GalleriesPage() {
  // 1. Fetch Data
  const galleries = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" }, // Newest first
    // We also want to know how many fairs use this gallery
    include: {
      _count: {
        select: { tourFairs: true, venueFairs: true, fairFairs: true },
      },
    },
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Galeriler</h1>
          <p className="text-muted-foreground mt-1">
            Fuar, tur ve mekanlar için görsel koleksiyonları.
          </p>
        </div>
        <Link href="/admin/galleries/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Yeni Galeri Oluştur
          </Button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Galeri Adı</TableHead>
              <TableHead>Tür</TableHead>
              <TableHead>Görsel Sayısı</TableHead>
              <TableHead>Kullanım Durumu</TableHead>
              <TableHead>Oluşturulma Tarihi</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {galleries.length === 0 ? (
              // Empty State
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <ImageIcon className="h-8 w-8 opacity-50" />
                    <p>Henüz hiç galeri eklenmemiş.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Data Mapping
              galleries.map((gallery) => {
                const usageCount =
                  gallery._count.tourFairs +
                  gallery._count.venueFairs +
                  gallery._count.fairFairs;

                return (
                  <TableRow key={gallery.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{gallery.name}</span>
                        {gallery.description && (
                          <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {gallery.description}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary" className="font-normal">
                        {gallery.type === "GENERAL"
                          ? "Genel"
                          : gallery.type === "TOUR"
                          ? "Tur Görselleri"
                          : "Fuar Alanı"}
                      </Badge>
                    </TableCell>

                    <TableCell>{gallery.imageUrls.length} Resim</TableCell>

                    <TableCell className="text-muted-foreground text-sm">
                      {usageCount === 0 ? (
                        <span className="text-slate-400">Kullanılmıyor</span>
                      ) : (
                        <span className="text-blue-600 font-medium">
                          {usageCount} Fuar
                        </span>
                      )}
                    </TableCell>

                    <TableCell>
                      {format(gallery.createdAt, "d MMMM yyyy", { locale: tr })}
                    </TableCell>

                    <TableCell className="text-right">
                      {/* We pass the ID to our Client Component */}
                      <GalleryRowActions id={gallery.id} />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
