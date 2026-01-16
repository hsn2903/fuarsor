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
import { tr } from "date-fns/locale";
import prisma from "@/lib/prisma";
import GalleryRowActions from "@/features/galleries/components/gallery-row-ations";

export default async function GalleriesPage() {
  // 1. Fetch Data
  const galleries = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Galeriler</h1>
          <p className="text-muted-foreground mt-1">
            Sistemdeki tüm fotoğraf koleksiyonları.
          </p>
        </div>
        <Link href="/admin/galleries/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Yeni Galeri Ekle
          </Button>
        </Link>
      </div>

      {/* Data Table */}
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Galeri Adı</TableHead>
              <TableHead>Tür</TableHead>
              <TableHead>Görsel Sayısı</TableHead>
              <TableHead>Oluşturulma Tarihi</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {galleries.length === 0 ? (
              // Empty State
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <ImageIcon className="h-8 w-8 opacity-50" />
                    <p>Henüz hiç galeri eklenmemiş.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Data Rows
              galleries.map((gallery) => (
                <TableRow key={gallery.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{gallery.name}</span>
                      <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {gallery.description}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline">{gallery.type}</Badge>
                  </TableCell>

                  <TableCell>{gallery.imageUrls.length} Resim</TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {format(gallery.createdAt, "d MMMM yyyy", { locale: tr })}
                  </TableCell>

                  <TableCell className="text-right">
                    <GalleryRowActions id={gallery.id} />
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
