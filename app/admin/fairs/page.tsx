import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, CalendarDays } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import FairRowActions from "@/features/fairs/components/fair-row-actions";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import prisma from "@/lib/prisma";
import SearchInput from "@/components/shared/search-input";
import PaginationControls from "@/components/shared/pagination-controls";
import { Prisma } from "@/app/generated/prisma/client";

// Define Props to access URL params
export default async function FairsPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; page?: string }>;
}) {
  // 1. Parse Params
  const query = (await searchParams)?.q || "";
  const currentPage = Number((await searchParams)?.page) || 1;
  const ITEMS_PER_PAGE = 10;

  // 2. Build Filter
  // We want to search by Name OR Venue
  const whereClause: Prisma.FairWhereInput = query
    ? {
        OR: [
          { name: { contains: query, mode: "insensitive" as const } },
          { venue: { contains: query, mode: "insensitive" as const } },
        ],
      }
    : {};

  // 3. Fetch Data + Total Count (Transaction for speed)
  // @ts-ignore
  const [fairs, totalCount] = await prisma.$transaction([
    prisma.fair.findMany({
      where: whereClause, // <--- Apply Filter
      take: ITEMS_PER_PAGE,
      skip: (currentPage - 1) * ITEMS_PER_PAGE, // <--- Calculate Offset
      orderBy: { startDate: "desc" },
      include: {
        _count: { select: { packages: true } },
      },
    }),
    prisma.fair.count({ where: whereClause }), // <--- Count filtered items
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Helper (Same as before)
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "default";
      case "Beklemede":
        return "secondary";
      case "Pasif":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fuarlar</h1>
          <p className="text-muted-foreground mt-1">
            Yönetilen tüm fuar organizasyonları.
          </p>
        </div>
        <Link href="/admin/fairs/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Yeni Fuar Ekle
          </Button>
        </Link>
      </div>

      {/* --- NEW: Search Bar --- */}
      <div className="flex items-center justify-between gap-4">
        <SearchInput placeholder="Fuar adı veya şehir ara..." />
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fuar Adı</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Yayın</TableHead>
              <TableHead>İçerik</TableHead>
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
                  <div className="flex flex-col items-center justify-center gap-2">
                    <CalendarDays className="h-8 w-8 opacity-50" />
                    <p>
                      {query
                        ? "Arama sonucu bulunamadı."
                        : "Henüz hiç fuar eklenmemiş."}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              fairs.map((fair) => (
                <TableRow key={fair.id}>
                  {/* ... (Row content remains identical to previous chapter) ... */}
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="text-base">{fair.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {fair.venue || "Yer belirtilmedi"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="text-sm">
                      {format(fair.startDate, "d MMM", { locale: tr })} -{" "}
                      {format(fair.endDate, "d MMM yyyy", { locale: tr })}
                    </div>
                  </TableCell>
                  <TableCell>
                    {/* @ts-ignore */}
                    <Badge variant={getStatusColor(fair.status)}>
                      {fair.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {fair.isPublished ? (
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-200 bg-green-50"
                      >
                        Yayında
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-amber-600 border-amber-200 bg-amber-50"
                      >
                        Taslak
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {fair._count.packages} Paket
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <FairRowActions id={fair.id} slug={fair.slug} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- NEW: Pagination Controls --- */}
      <PaginationControls totalPages={totalPages} />
    </div>
  );
}
