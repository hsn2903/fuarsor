"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CalendarDays,
  Building2,
  ImageIcon,
  Settings,
  LogOut,
} from "lucide-react";

// Define our navigation items
const routes = [
  {
    label: "Panel Özeti",
    icon: LayoutDashboard,
    href: "/admin",
    color: "text-sky-500",
  },
  {
    label: "Fuarlar",
    icon: CalendarDays,
    href: "/admin/fairs",
    color: "text-violet-500",
  },
  {
    label: "Oteller",
    icon: Building2,
    href: "/admin/hotels",
    color: "text-pink-700",
  },
  {
    label: "Galeriler",
    icon: ImageIcon,
    href: "/admin/galleries",
    color: "text-orange-700",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      {/* Logo Area */}
      <div className="px-3 py-2 flex-1">
        <Link href="/admin" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4 bg-white rounded-full flex items-center justify-center">
            <span className="font-bold text-black">F</span>
          </div>
          <h1 className="text-2xl font-bold">
            Fair<span className="text-blue-500">Manager</span>
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                // Highlight active route
                pathname === route.href ||
                  (route.href !== "/admin" && pathname.startsWith(route.href))
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Area (Settings/Logout) */}
      <div className="px-3 py-2 border-t border-white/10">
        <div className="space-y-1">
          <Link
            href="/admin/settings"
            className="text-zinc-400 hover:text-white hover:bg-white/10 flex p-3 w-full rounded-lg transition text-sm font-medium"
          >
            <Settings className="h-5 w-5 mr-3 text-gray-400" />
            Ayarlar
          </Link>
          <button className="text-zinc-400 hover:text-red-400 hover:bg-white/10 flex p-3 rounded-lg transition text-sm font-medium w-full">
            <LogOut className="h-5 w-5 mr-3" />
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
}
