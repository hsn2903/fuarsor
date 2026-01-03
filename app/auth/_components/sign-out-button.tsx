"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const SignOutButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onResponse(context) {
          setLoading(false);
        },
        onSuccess: () => {
          toast.success("User signed out successfully");
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  };
  return (
    <Button variant="destructive" onClick={handleSignOut} disabled={loading}>
      {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
      <LogOutIcon className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  );
};

export default SignOutButton;
