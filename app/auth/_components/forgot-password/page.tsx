"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await authClient.resetPassword(
      {
        email,
        redirectTo: "/authreset-password", // The page they land on after clicking email link
      },
      {
        onSuccess: () => {
          setIsSent(true);
          setLoading(false);
          toast.success("Sıfırlama bağlantısı gönderildi.");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setLoading(false);
        },
      }
    );
  };

  if (isSent) {
    return (
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-2">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle>Email Gönderildi</CardTitle>
          <CardDescription>
            Lütfen <strong>{email}</strong> adresini kontrol edin. Şifrenizi
            sıfırlamak için bir bağlantı gönderdik.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button asChild variant="ghost">
            <Link href="/login">Giriş Sayfasına Dön</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Şifremi Unuttum</CardTitle>
        <CardDescription>
          Email adresinizi girin, size sıfırlama bağlantısı gönderelim.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="ornek@sirket.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Bağlantı Gönder
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link
          href="/login"
          className="flex items-center text-sm text-muted-foreground hover:text-primary transition"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Giriş Sayfasına Dön
        </Link>
      </CardFooter>
    </Card>
  );
}
