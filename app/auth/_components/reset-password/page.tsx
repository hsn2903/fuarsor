"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Capture the token from URL

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Şifreler eşleşmiyor.");
      return;
    }

    if (!token) {
      toast.error("Geçersiz veya eksik token.");
      return;
    }

    setLoading(true);

    await authClient.resetPassword(
      {
        newPassword: password,
        token: token,
      },
      {
        onSuccess: () => {
          toast.success("Şifreniz başarıyla güncellendi!");
          router.push("/login");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setLoading(false);
        },
      }
    );
  };

  if (!token) {
    return (
      <div className="text-center text-red-500 font-medium p-4">
        Hata: Sıfırlama kodu bulunamadı. Lütfen emaildaki linke tekrar tıklayın.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Yeni Şifre</Label>
        <Input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</Label>
        <Input
          id="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="******"
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Şifreyi Güncelle
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Şifreyi Sıfırla</CardTitle>
        <CardDescription>
          Lütfen hesabınız için yeni bir şifre belirleyin.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Suspense is required for using useSearchParams in Client Components */}
        <Suspense
          fallback={
            <div className="flex justify-center p-4">
              <Loader2 className="animate-spin" />
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </CardContent>
    </Card>
  );
}
