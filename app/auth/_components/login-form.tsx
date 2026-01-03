"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/profile",
        rememberMe: true,
      },
      {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          setLoading(false);
          toast.success("User signed in successfully");
          router.push("/profile");
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(ctx.error.message);
        },
      }
    );
  };
  return (
    <form onSubmit={handleSignIn} className="flex flex-col gap-4">
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      <div className="flex items-center">
        <p>Don't have an account?</p>
        <Link href="/auth/register">
          <Button variant="link" size="sm">
            Register
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
