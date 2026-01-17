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
  Plane,
  LockIcon,
  UserIcon,
  UsersIcon,
  BookIcon,
  SpeakerIcon,
  MegaphoneIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

// Define navigation items in one place
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
    color: "text-sky-500",
  },
  {
    label: "Oteller",
    icon: Building2,
    href: "/admin/hotels",
    color: "text-sky-500",
  },
  {
    label: "Galeriler",
    icon: ImageIcon,
    href: "/admin/galleries",
    color: "text-sky-500",
  },
  {
    label: "Blog",
    icon: BookIcon,
    href: "/admin/posts",
    color: "text-sky-500",
  },
  {
    label: "Kampanyalar",
    icon: MegaphoneIcon,
    href: "/admin/campaigns",
    color: "text-sky-500",
  },
  {
    label: "Admin",
    icon: LockIcon,
    href: "/admin/super-admin",
    color: "text-sky-500",
  },
  // {
  //   label: "Kullanıcılar",
  //   icon: UsersIcon,
  //   href: "/admin/users",
  //   color: "text-sky-500",
  // },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login"); // Redirect to login
        },
      },
    });
  };

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white">
      {/* 1. Logo Area */}
      <div className="px-3 py-2 flex-1">
        <Link href="/admin" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4 bg-white rounded-lg flex items-center justify-center">
            <Plane className="h-5 w-5 text-blue-600" />
          </div>
          <h1 className="text-xl font-bold">
            Fair<span className="text-blue-500">Manager</span>
          </h1>
        </Link>

        {/* 2. Navigation Links */}
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition duration-200",
                // Highlight logic: Exact match or sub-path match (except root)
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

      {/* 3. Bottom Actions (Settings/Logout) */}
      <div className="px-3 py-2 border-t border-white/10">
        <div className="space-y-1">
          <Link
            href="/admin/settings"
            className="text-zinc-400 hover:text-white hover:bg-white/10 flex p-3 w-full rounded-lg transition text-sm font-medium"
          >
            <Settings className="h-5 w-5 mr-3" />
            Ayarlar
          </Link>
          <button
            onClick={handleLogout} // <--- Add onClick
            className="text-zinc-400 hover:text-red-400 hover:bg-white/10 flex p-3 w-full rounded-lg transition text-sm font-medium text-left"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
}
