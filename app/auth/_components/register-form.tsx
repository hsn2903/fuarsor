"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/admin",
      },
      {
        onRequest: (ctx) => {
          //show loading
          setLoading(true);
        },
        onSuccess: (ctx) => {
          //redirect to the profile or sign in page
          setLoading(false);
          toast.success(
            "Hesabınız oluşturuldu. Lütfen email adresinize gelen linki tıklayarak hesabınızı aktifleştirin.",
          );
          router.push("/auth/email-sent");
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <Button type="submit" disabled={loading}>
        Register
      </Button>

      <div className="flex items-center">
        <p>Already have an account?</p>
        <Link href="/auth/login">
          <Button variant="link" size="sm">
            Login
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
