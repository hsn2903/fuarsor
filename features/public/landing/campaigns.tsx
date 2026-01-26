import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function CampaignsSection() {
  const campaigns = await prisma.campaign.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  // const campaigns = [
  //   {
  //     id: 1,
  //     title: "Yaz Tatili Erken Rezervasyon",
  //     description:
  //       "2024 yaz tatilinizi şimdiden planlayın, %30'a varan indirimlerden yararlanın!",
  //     imageUrl: "/images/hero.jpg",
  //     link: "/campaigns/summer-early-booking",
  //   },
  //   {
  //     id: 2,
  //     title: "Kültür Turlarında Büyük Fırsat",
  //     description:
  //       "Türkiye'nin tarihi ve kültürel zenginliklerini keşfedin, ikinci kişi %50 indirimli!",
  //     imageUrl: "/images/hero.jpg",
  //     link: "/campaigns/cultural-tours-discount",
  //   },
  // ];

  if (!campaigns) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Güncel Kampanyalar
          </h2>
          <Button asChild variant="outline">
            <Link href="/kampanyalar">
              Tümünü Gör
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {campaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="overflow-hidden bg-white dark:bg-gray-800 shadow-lg rounded-lg py-0"
            >
              <CardContent className="p-0">
                <div className="relative aspect-2/1">
                  <Image
                    src={campaign?.image || "/images/hero.jpg"}
                    alt={campaign?.name || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {campaign?.name || ""}
                    </h3>
                    <p className="text-gray-200 mb-4">
                      {campaign?.description || ""}
                    </p>
                    <Link href={`/kampanyalar/${campaign?.id}`}>
                      <Button>Detayları Gör</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
