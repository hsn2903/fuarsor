"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Plane,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gray-950 text-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and socials */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold flex items-center mb-4"
            >
              <Plane className="mr-2" />
              Fuarlarım
            </Link>
            <p className="text-gray-400 mb-4">
              Türkiye’nin en kapsamlı fuar platformu. Yeni fırsatları keşfedin,
              işinizi büyütün.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Hızlı Bağlantılar */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Anasayfa
                </Link>
              </li>
              <li>
                <Link
                  href="/fuarlar"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Fuarlar
                </Link>
              </li>
              <li>
                <Link
                  href="/hakkimizda"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim Bilgileri</h3>
            <ul className="space-y-2">
              {/* <li className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span className="text-gray-400">
                  İstiklal Cad. No:123, İstanbul, Türkiye
                </span>
              </li> */}
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a
                  href="tel:+905459701919"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  +90 545 970 19 19
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a
                  href="mailto:info@fuarlarim.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  info@fuarlarim.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Bültenimize Abone Olun
            </h3>
            <p className="text-gray-400 mb-4">
              En son seyahat haberleri ve özel teklifler için abone olun.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="E-posta adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                required
              />
              <Button
                type="submit"
                className="w-full cursor-pointer bg-gray-800"
              >
                Abone Ol
              </Button>
            </form>
          </div>
        </div>
        <Separator className="bg-gray-700 my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Fuarlarım. Tüm hakları saklıdır.
          </p>
          <nav className="flex flex-wrap justify-center gap-4">
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Gizlilik Politikası
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Kullanım Şartları
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Çerez Politikası
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
