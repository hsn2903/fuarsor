import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Building2, ShieldCheck, ArrowRight } from "lucide-react";

const SuperAdminPage = () => {
  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      {/* Sayfa Başlığı Alanı */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/10 rounded-lg">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Super Admin Paneli
          </h2>
          <p className="text-muted-foreground">
            Sistem genelindeki tüm yetkili işlemleri buradan yönetebilirsiniz.
          </p>
        </div>
      </div>

      {/* Grid Yapısı: Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Kart 1: Kullanıcı Yönetimi */}
        <Card className="hover:shadow-md transition-shadow border-muted">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Users className="w-10 h-10 text-blue-500 mb-2" />
            </div>
            <CardTitle>Kullanıcıları Yönet</CardTitle>
            <CardDescription>
              Tüm kullanıcıların rollerini, durumlarını ve üyeliklerini
              düzenleyin.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full group">
              <Link href="/admin/users">
                Kullanıcı Listesine Git
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Kart 2: Fuar Yönetimi */}
        <Card className="hover:shadow-md transition-shadow border-muted">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Building2 className="w-10 h-10 text-orange-500 mb-2" />
            </div>
            <CardTitle>Fuarları Yönet</CardTitle>
            <CardDescription>
              Fuar verilerini çekin (scrape), düzenleyin veya yeni fuar ekleyin.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full group" variant="default">
              <Link href="/admin/fair-scraping">
                Fuar İşlemlerine Git
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Gelecekte eklenebilecek boş kart örneği (Opsiyonel) */}
        {/* <Card className="opacity-50 border-dashed">
             <CardHeader>...</CardHeader>
        </Card> */}
      </div>
    </div>
  );
};

export default SuperAdminPage;
