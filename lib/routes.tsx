import {
  CalendarDaysIcon,
  LayoutDashboardIcon,
  Building2Icon,
  ImageIcon,
  BookIcon,
  MegaphoneIcon,
  LockIcon,
  MessageSquareIcon,
  BinocularsIcon,
} from "lucide-react";

export const ADMIN_ROUTES = [
  {
    label: "Panel Özeti",
    icon: LayoutDashboardIcon,
    href: "/admin",
    color: "text-sky-500",
  },
  {
    label: "Fuarlar",
    icon: CalendarDaysIcon,
    href: "/admin/fairs",
    color: "text-sky-500",
  },
  {
    label: "Oteller",
    icon: Building2Icon,
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
  {
    label: "Mesajlar",
    icon: MessageSquareIcon,
    href: "/admin/messages",
    color: "text-sky-500",
  },
  {
    label: "SEO",
    icon: BinocularsIcon,
    href: "/admin/seo",
    color: "text-sky-500",
  },
];
