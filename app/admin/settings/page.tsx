import { requireAdmin } from "@/lib/auth-guard"; // Server-side check
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
  // 1. Block access immediately if not admin
  // This prevents manual URL access (e.g., typing /admin/settings)
  await requireAdmin();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Sistem Ayarları</h2>

      <Card>
        <CardHeader>
          <CardTitle>Genel Yapılandırma</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="siteName">Site Başlığı</Label>
            <Input type="text" id="siteName" placeholder="Fair Manager" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="maintenance">Bakım Modu</Label>
            <Button variant="destructive">Bakım Modunu Aç</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
