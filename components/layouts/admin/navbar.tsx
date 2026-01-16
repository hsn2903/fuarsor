import { User } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <div className="flex items-center p-4 border-b h-16 bg-white shadow-sm">
      {/* Mobile Toggle (Visible only on mobile via CSS) */}
      <MobileSidebar />

      {/* Right Side: User Profile */}
      <div className="flex w-full justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar className="cursor-pointer hover:opacity-80 transition h-9 w-9">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-blue-600 text-white">
                AD
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Profil
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Ayarlar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50">
              Çıkış Yap
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
