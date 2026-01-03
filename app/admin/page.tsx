import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Building2, ImageIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";

export default async function AdminDashboardPage() {
  // 1. Fetch Key Metrics (Parallel Requests for speed)
  const [fairCount, hotelCount, galleryCount, recentFairs] = await Promise.all([
    prisma.fair.count(),
    prisma.hotel.count(),
    prisma.gallery.count(),
    prisma.fair.findMany({
      take: 5, // Only get the 5 newest
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        status: true,
        startDate: true,
        createdAt: true,
      },
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Panel Özeti</h2>
        <p className="text-muted-foreground">
          Sisteme genel bakış ve son aktiviteler.
        </p>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Fairs Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Fuar</CardTitle>
            <CalendarDays className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fairCount}</div>
            <p className="text-xs text-muted-foreground">
              Sistemde kayıtlı aktif veya pasif fuar.
            </p>
          </CardContent>
        </Card>

        {/* Hotels Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Otel</CardTitle>
            <Building2 className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hotelCount}</div>
            <p className="text-xs text-muted-foreground">
              Konaklama seçenekleri ve oteller.
            </p>
          </CardContent>
        </Card>

        {/* Galleries Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Galeri</CardTitle>
            <ImageIcon className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{galleryCount}</div>
            <p className="text-xs text-muted-foreground">
              Fuar ve tur görsel koleksiyonları.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* --- RECENT FAIRS TABLE --- */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Son Eklenen Fuarlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {recentFairs.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Henüz veri girişi yapılmamış.
              </p>
            ) : (
              recentFairs.map((fair) => (
                <div
                  key={fair.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {fair.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Eklendi:{" "}
                      {format(fair.createdAt, "d MMMM yyyy", { locale: tr })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={
                        fair.status === "Aktif" ? "default" : "secondary"
                      }
                    >
                      {fair.status}
                    </Badge>
                    <Link
                      href={`/admin/fairs/${fair.id}/edit`}
                      className="text-sm text-blue-600 hover:underline flex items-center"
                    >
                      Düzenle <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
