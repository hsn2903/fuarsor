"use client";

import { Album, CalendarDays, Hotel, TramFront, MapIcon } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";

const ShortcutsSection = () => {
  const [activeShortcut, setActiveShortcut] = useState(null);

  const shortcuts = [
    { icon: CalendarDays, label: "Tur Programları", href: "#tur-programları" },
    { icon: TramFront, label: "Tur Hizmetleri", href: "#hizmetler" },
    { icon: Hotel, label: "Otelden Görüntüler", href: "#otel-resimleri" },
    { icon: Album, label: "Fuardan Görüntüler", href: "#fuar-resimleri" },
    { icon: MapIcon, label: "Fuar Haritası", href: "#fuar-haritası" },
  ];

  return (
    <Card className="hidden md:flex flex-col items-center justify-center fixed top-60 right-0 transform -translate-y-1/2 z-50 p-2 bg-secondary backdrop-blur-md border-none shadow-xl rounded-md">
      <TooltipProvider>
        <div className="flex flex-col space-y-2">
          {shortcuts.map((shortcut, index) => (
            <Tooltip key={index} delayDuration={200}>
              <TooltipTrigger asChild>
                <a
                  href={shortcut.href}
                  className={`
                    p-2.5 rounded-full transition-all duration-300 group
                    ${
                      activeShortcut === index
                        ? "bg-blue-50 scale-110"
                        : "hover:bg-gray-100"
                    }
                  `}
                  onMouseEnter={() => setActiveShortcut(index)}
                  onMouseLeave={() => setActiveShortcut(null)}
                >
                  <shortcut.icon
                    size={24}
                    className={`
                      transition-colors duration-300
                      ${
                        activeShortcut === index
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-blue-500"
                      }
                    `}
                  />
                </a>
              </TooltipTrigger>
              <TooltipContent side="left" className="bg-gray-800 text-white">
                <p className="text-xs">{shortcut.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </Card>
  );
};

export default ShortcutsSection;
