import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FairRowActions from "@/features/fairs/components/fair-row-actions";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import prisma from "@/lib/prisma";

export default async function FairsPage() {
  // 1. Fetch Fairs with Relations
  const fairs = await prisma.fair.findMany({
    orderBy: { startDate: "desc" }, // Show nearest/recent fairs first
    include: {
      hotel: { select: { name: true } }, // Get just the Hotel Name
      _count: { select: { packages: true } }, // Count the packages
    },
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fuarlar</h1>
          <p className="text-muted-foreground mt-1">
            Yönetim panelindeki tüm aktif ve taslak fuarlar.
          </p>
        </div>
        <Link href="/admin/fairs/new">
          <Button size="lg">
            <Plus className="mr-2 h-4 w-4" /> Yeni Fuar Ekle
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Fuar Adı</TableHead>
              <TableHead>Tarihler</TableHead>
              <TableHead>Konum / Otel</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Paketler</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fairs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <CalendarDays className="h-8 w-8 opacity-50" />
                    <p>Henüz kayıtlı fuar bulunmuyor.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              fairs.map((fair) => (
                <TableRow key={fair.id}>
                  {/* Name & Slug */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-base">
                        {fair.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        /{fair.slug}
                      </span>
                      {fair.isFeatured && (
                        <span className="text-[10px] bg-yellow-100 text-yellow-800 px-1 rounded w-fit mt-1">
                          Öne Çıkan
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Dates */}
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span>
                        {format(fair.startDate, "d MMM yyyy", { locale: tr })}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {format(fair.endDate, "d MMM yyyy", { locale: tr })}
                      </span>
                    </div>
                  </TableCell>

                  {/* Location & Hotel */}
                  <TableCell>
                    <div className="flex flex-col gap-1 text-sm">
                      {fair.venue && (
                        <div className="flex items-center gap-1 text-slate-700">
                          <MapPin className="h-3 w-3" /> {fair.venue}
                        </div>
                      )}
                      {fair.hotel ? (
                        <div className="text-muted-foreground text-xs">
                          🏨 {fair.hotel.name}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          Otel Yok
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant={
                        fair.status === "Aktif" ? "default" : "secondary"
                      }
                      className={
                        fair.status === "Aktif"
                          ? "bg-green-600 hover:bg-green-700"
                          : fair.status === "Pasif"
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : ""
                      }
                    >
                      {fair.status}
                    </Badge>
                  </TableCell>

                  {/* Package Count */}
                  <TableCell>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                      {fair._count.packages}
                    </span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <FairRowActions id={fair.id} />
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
