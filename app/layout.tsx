import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Fuarlarım",
    default: "Fuarlarım",
  },
  description: "Dünya Fuarlarını Keşfet",
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
