import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmailSentPage() {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-2">
          <Mail className="h-6 w-6 text-blue-600" />
        </div>
        <CardTitle>Email Gönderildi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Hesabınızı aktifleştirmek için lütfen email adresinize gönderilen
          bağlantıya tıklayın.
        </p>
        <div className="pt-2">
          <Button asChild variant="outline" className="w-full">
            <Link href="/login">Giriş Sayfasına Dön</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
