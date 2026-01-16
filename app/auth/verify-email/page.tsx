"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

// We separate the logic into a sub-component to wrap it in Suspense
// (Next.js requires Suspense for useSearchParams)
function VerifyLogic() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    // Call the API to verify
    authClient.verifyEmail(
      {
        query: { token },
      },
      {
        onSuccess: () => {
          setStatus("success");
        },
        onError: () => {
          setStatus("error");
        },
      }
    );
  }, [token]);

  if (status === "verifying") {
    return (
      <div className="flex flex-col items-center gap-4 py-6">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-muted-foreground">Doğrulanıyor...</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
        <h2 className="text-xl font-semibold text-green-700">Başarılı!</h2>
        <p className="text-muted-foreground">Email adresiniz doğrulandı.</p>
        <Button
          onClick={() => router.push("/dashboard")}
          className="w-full mt-2"
        >
          Panele Git
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-4 text-center">
      <XCircle className="h-12 w-12 text-red-500" />
      <h2 className="text-xl font-semibold text-red-700">Hata</h2>
      <p className="text-muted-foreground">
        Bağlantı geçersiz veya süresi dolmuş.
      </p>
      <Button
        variant="outline"
        onClick={() => router.push("/login")}
        className="w-full mt-2"
      >
        Girişe Dön
      </Button>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Email Doğrulama</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense
          fallback={
            <div className="flex justify-center">
              <Loader2 className="animate-spin" />
            </div>
          }
        >
          <VerifyLogic />
        </Suspense>
      </CardContent>
    </Card>
  );
}
