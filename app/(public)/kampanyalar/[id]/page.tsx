import ContactForm from "@/components/shared/contact-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import {
  Calendar,
  Clock,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CampaignPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: id,
    },
  });

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={campaign?.image || "/images/hero.jpg"}
                alt={campaign?.name || "Kampanya resmi"}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6">
              <Badge className="mb-4">Kampanya</Badge>
              <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                {campaign?.name}
              </h1>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  {campaign?.createdAt
                    ? new Date(campaign.createdAt).toLocaleDateString("tr-TR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </span>
                <Clock className="ml-4 mr-2 h-4 w-4" />
                {/* <span>{blog.readTime}</span> */}
              </div>
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: campaign?.description || "",
                }}
              />
            </div>
          </article>
        </div>
        <div className="lg:w-1/3">
          <div className="mb-6 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={campaign?.image || ""} alt="" />
                    <AvatarFallback>{campaign?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                      Fuarlarım Künye
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Dünya çapında fuarlar
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Explicabo, dolor.
                </p>
                <div className="flex space-x-4">
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <FacebookIcon size={20} />
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <TwitterIcon size={20} />
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <InstagramIcon size={20} />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="sticky top-4  flex flex-col gap-8">
            <ContactForm from={`${campaign?.name} - Makalesi`} />
          </div>
        </div>
      </div>
    </main>
  );
};
export default CampaignPage;
