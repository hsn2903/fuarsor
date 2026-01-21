import Link from "next/link";
import LoginForm from "../_components/login-form";
import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import Image from "next/image";
// import { APP_NAME } from "@/lib/constants";
// import SocialButtons from "../_components/social-buttons";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Giriş Yap</CardTitle>
          <CardDescription>Email ve şifreniz ile devam edin.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 1. Add Social Buttons */}
          {/* <SocialButtons /> */}

          {/* 2. Add Separator */}
          {/* <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Veya email ile devam et
              </span>
            </div>
          </div> */}

          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
