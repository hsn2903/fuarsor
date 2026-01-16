"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, Save, Trash2, MapPin, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DraftFair } from "../types";
import { saveTradeShow, scrapeTradeShows } from "../actions";

// Metin kısaltma yardımcısı
const truncateText = (text: string | null, length: number) => {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "..." : text;
};

// Tarih formatlayıcı (Daha kısa görünmesi için: 14.10.2025)
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

export default function TradeShowList() {
  const [data, setData] = useState<DraftFair[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());

  const handleScrape = async () => {
    setLoading(true);
    const result = await scrapeTradeShows();
    if (result.success && result.data) setData(result.data);
    setLoading(false);
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSave = async (show: DraftFair) => {
    setSavingIds((prev) => new Set(prev).add(show.id));
    await saveTradeShow(show);
    setSavingIds((prev) => {
      const n = new Set(prev);
      n.delete(show.id);
      return n;
    });
  };

  return (
    <Card className="w-full max-w-6xl mx-auto my-8 border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Fuar Listesi</CardTitle>
            <CardDescription>Sıkıştırılmış Görünüm</CardDescription>
          </div>
          <Button onClick={handleScrape} disabled={loading} size="sm">
            {loading ? "Yükleniyor..." : "Listeyi Yenile"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* 'table-fixed' sütun genişliklerini sabitler, taşmayı engeller */}
        <Table className="table-fixed w-full">
          <TableHeader className="bg-muted/40">
            <TableRow>
              {/* Genişlikleri % veya w-sınıfları ile biz belirliyoruz */}
              <TableHead className="w-[40%] pl-4">Fuar Detayı</TableHead>
              <TableHead className="w-[25%]">Konum</TableHead>
              <TableHead className="w-[20%]">Tarih</TableHead>
              <TableHead className="w-[15%] text-right pr-4">İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((show) => (
              <TableRow key={show.id} className="h-16">
                {/* 1. SÜTUN: İSİM & AÇIKLAMA */}
                <TableCell className="pl-4 align-middle">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="font-semibold text-sm truncate"
                        title={show.name}
                      >
                        {truncateText(show.name, 35)}
                      </span>
                      {/* Slug çok uzunsa sadece ikon veya çok kısa gösterilir */}
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1 h-5 hidden sm:flex"
                      >
                        {show.slug.slice(0, 15)}...
                      </Badge>
                    </div>
                    <span
                      className="text-xs text-muted-foreground"
                      title={show.description}
                    >
                      {/* Slice ile açıklama metnini kesin olarak sınırla */}
                      {truncateText(show.description, 60)}
                    </span>
                  </div>
                </TableCell>

                {/* 2. SÜTUN: MEKAN */}
                <TableCell className="align-middle">
                  <div className="flex items-start gap-1.5 text-sm text-gray-700">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 text-muted-foreground shrink-0" />
                    <span title={show.venue || ""}>
                      {truncateText(show.venue, 25)}
                    </span>
                  </div>
                </TableCell>

                {/* 3. SÜTUN: TARİH */}
                <TableCell className="align-middle">
                  <div className="flex items-center gap-1.5 text-xs font-medium border rounded px-2 py-1 w-fit bg-gray-50">
                    <CalendarDays className="w-3.5 h-3.5 text-blue-600" />
                    <div className="flex flex-col leading-none gap-0.5">
                      <span>{formatDate(show.startDate)}</span>
                      <span className="text-muted-foreground text-[10px]">
                        {formatDate(show.endDate)}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* 4. SÜTUN: BUTONLAR (Sadece İkon) */}
                <TableCell className="text-right pr-4 align-middle">
                  <div className="flex justify-end gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-green-700 hover:text-green-800 hover:bg-green-50"
                      onClick={() => handleSave(show)}
                      disabled={savingIds.has(show.id)}
                      title="Kaydet"
                    >
                      {savingIds.has(show.id) ? (
                        <Loader2 className="animate-spin h-4 w-4" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(show.id)}
                      title="Listeden Çıkar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {!data.length && !loading && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center h-24 text-muted-foreground"
                >
                  Veri yok.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
