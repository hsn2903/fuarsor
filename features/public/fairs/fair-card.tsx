import { Fair } from "@/app/generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format, formatDistance, isAfter } from "date-fns";
import { tr } from "date-fns/locale";
import { Calendar, CalendarRangeIcon, GlobeIcon, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const FairCard = ({ fair }: { fair: Fair }) => {
  const getStatusBadge = (startDate: Date, endDate: Date | null) => {
    const now = new Date();
    if (endDate && isAfter(now, endDate)) {
      return <Badge variant="secondary">Tamamlandı</Badge>;
    }
    if (isAfter(now, startDate)) {
      return <Badge variant="default">Devam Ediyor</Badge>;
    }
    return (
      <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
        {formatDistance(startDate, now, { addSuffix: true, locale: tr })}
      </Badge>
    );
  };

  return (
    <Card
      key={fair.id}
      className="overflow-hidden bg-white dark:bg-gray-800 border-0 group py-0"
    >
      {/* <Image
        src={fair.logoImage || "/images/hero.jpg"}
        alt={fair.name}
        width={400}
        height={300}
        className="object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute top-2 right-2 bg-gray-800/90 text-white px-3 py-1 text-xs rounded-md">
        {fair.category}
      </div> */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={fair.logoUrl || "/images/hero.jpg"}
          alt={fair.name}
          width={400} // Specific width
          height={300} // Specific height (for 4:3 aspect ratio)
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-gray-800/90 text-white px-3 py-1 text-xs rounded-md">
          {fair.category}
        </div>
      </div>
      <CardContent className="px-4">
        <Link
          href={`/fuarlar/${fair.slug}`}
          className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100 block -mt-2"
        >
          {fair.name}
        </Link>
        {/* <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
          {fair.name}
        </h3> */}
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          <div className="flex gap-1 items-center mb-2">
            <Calendar className="mr-2 h-4 w-4" />
            <time dateTime={fair.startDate.toLocaleDateString()}>
              {new Date(fair.startDate).toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <div className="flex gap-1 items-center">
            <CalendarRangeIcon className="mr-2 h-4 w-4" />
            {fair.endDate && (
              <time dateTime={fair.endDate.toLocaleDateString()}>
                {new Date(fair.endDate).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
          <GlobeIcon className="mr-3 h-4 w-4" />
          <span>{fair.type} Fuarı</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
          <MapPin className="mr-3 h-4 w-4" />
          <span>{fair.venue}</span>
        </div>
        <Link href={`/fuarlar/${fair.slug}`} className="block mb-4">
          <Button className="w-full cursor-pointer">Detayları Gör</Button>
        </Link>
      </CardContent>
    </Card>
  );
};
