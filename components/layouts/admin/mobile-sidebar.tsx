"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AdminSidebar from "./admin-sidebar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function MobileSidebar() {
  // Hydration fix: Ensure this component only mounts on the client
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close the sheet whenever the URL changes (user navigated)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!isMounted) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      {/* Side="left" makes it slide from left. p-0 removes default padding so our sidebar fills it. */}
      <SheetContent
        side="left"
        className="p-0 bg-slate-900 border-none w-72 text-white"
      >
        <AdminSidebar />
      </SheetContent>
    </Sheet>
  );
}
