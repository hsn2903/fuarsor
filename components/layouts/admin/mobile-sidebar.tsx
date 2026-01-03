"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Shadcn Sheet
import AdminSidebar from "./admin-sidebar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function MobileSidebar() {
  // Hydration fix: Ensure this doesn't render on server to prevent mismatch
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 bg-[#111827] text-white border-none w-72"
      >
        <AdminSidebar />
      </SheetContent>
    </Sheet>
  );
}
