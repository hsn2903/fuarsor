import HotelForm from "@/features/hotels/components/hotel-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewHotelPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/hotels">
          <Button variant="outline" size="icon" title="Listeye Dön">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Yeni Otel Ekle</h1>
          <p className="text-muted-foreground">
            Fuarlarda kullanılmak üzere konaklama seçeneği oluşturun.
          </p>
        </div>
      </div>

      <HotelForm />
    </div>
  );
}
