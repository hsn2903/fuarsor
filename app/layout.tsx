import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // title: "Fuarlarım",
  title: {
    template: "%s | Fuarlarım",
    default: "Fuarlarım",
  },
  description: "Dünyadaki fuarlardan haberdar olun",
  keywords: "fuar, çin, vize, danışmanlık, gezi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.className}`}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
