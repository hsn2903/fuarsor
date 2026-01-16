import { getAllFairs } from "@/app/_actions/fairs";
import prisma from "@/lib/prisma";
import Image from "next/image";
import {
  FaCalendarAlt,
  FaCheck,
  FaGlobe,
  FaLayerGroup,
  FaLocationArrow,
} from "react-icons/fa";
import ServicesSection from "./_components/services";
import HotelsSection from "./_components/hotels-section";
import TurProgramlari from "./_components/tour-programs";
import FairImagesSection from "./_components/fair-images-section";
import ImageGalleryButton from "./_components/image-gallery-button";
import SectionTitle from "./_components/section-title";
import ContactForm from "@/components/shared/contact-form";

// export const generateMetadata = async ({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) => {
//   const fairSlug = (await params).slug;

//   const fair = await prisma.fair.findFirst({
//     where: { slug: fairSlug },
//   });

//   return {
//     title: fair?.name,
//     // Join the array into a string for the meta description
//     description: fair?.products ? fair.products.join(", ") : fair?.description,
//     openGraph: {
//       title: fair?.name,
//       description: fair?.description,
//       images: fair?.logoUrl ? [fair.logoUrl] : [],
//     },
//   };
// };

// export const generateStaticParams = async ({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) => {
//   const fairs = await getAllFairs();

//   return fairs.map((fair) => ({
//     slug: fair.slug,
//   }));
// };

const FuarDetayPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const fairSlug = (await params).slug;

  const fair = await prisma.fair.findFirst({
    where: { slug: fairSlug },
    include: {
      hotel: true,
      // Updated relations according to new Schema
      fairGallery: true,
      tourGallery: true,
      venueGallery: true,
    },
  });

  if (!fair) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold text-red-500">
          Böyle bir fuar bulunamadı
        </h1>
      </div>
    );
  }

  // Helper for Turkish Date Formatting
  const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen">
      <div className="bg-gray-800 w-full h-40 flex justify-center items-center relative">
        <div className="">
          {/* Added fallback for logoUrl since it is optional in schema */}
          <Image
            src={fair?.logoUrl || "/images/placeholder.png"}
            alt={fair?.name || "Fuar Logosu"}
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        <ImageGalleryButton />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-20">
        <div className="lg:w-2/3 flex flex-col gap-12 mb-20">
          <div className="flex flex-col gap-4 py-12">
            <h2 className="text-4xl font-bold text-primary/80">{fair.name}</h2>
            <p>{fair.description}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-4">
              {/* Category Section */}
              {fair.category && (
                <div className="flex items-center group gap-2">
                  <FaLayerGroup className="text-gray-500 text-xl group-hover:text-gray-700 transition-colors" />
                  <div className="text-gray-700 ml-2 font-medium flex items-center gap-2">
                    <p className="font-semibold w-32">Fuar Sektörü: </p>
                    <p>{fair.category}</p>
                  </div>
                </div>
              )}

              {/* Date Section - Fixed syntax error */}
              <div className="flex items-center group gap-2">
                <FaCalendarAlt className="text-gray-500 text-xl group-hover:text-gray-700 transition-colors" />
                <div className="text-gray-700 ml-2 font-medium flex items-center gap-2">
                  <p className="font-semibold w-32">Fuar Tarihi: </p>
                  <p>
                    {dateFormatter.format(fair.startDate)} -{" "}
                    {dateFormatter.format(fair.endDate)}
                  </p>
                </div>
              </div>

              {/* Venue Section */}
              <div className="flex items-center group gap-2">
                <FaLocationArrow className="text-gray-500 text-xl group-hover:text-gray-700 transition-colors" />
                <div className="text-gray-700 ml-2 font-medium flex items-center gap-2">
                  <p className="font-semibold w-32">Fuar Yeri: </p>
                  <p>{fair?.venue || "Belirtilmemiş"}</p>
                </div>
              </div>

              {/* Website Section */}
              {fair.website && (
                <div className="flex items-center group gap-2">
                  <FaGlobe className="text-gray-500 text-xl group-hover:text-gray-700 transition-colors" />
                  <div className="text-gray-700 ml-2 font-medium flex items-center gap-2">
                    <p className="font-semibold w-32">Fuar Websitesi: </p>
                    <a
                      href={
                        fair.website.startsWith("http")
                          ? fair.website
                          : `https://${fair.website}`
                      }
                      className="text-gray-600 hover:text-gray-700 hover:underline transition-colors font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {fair.website.replace(/^https?:\/\//, "").slice(0, 20)}...
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Section - Updated for String Array */}
          <div>
            <SectionTitle title="Sergilenen Ürünler" />

            <section className="py-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                {/* Check if products exists, no need to split string anymore */}
                {(fair.products || []).map((product, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-gray-50 p-3 rounded-md"
                    >
                      <FaCheck className="text-green-500 shrink-0" />
                      <p className="text-gray-700 text-sm capitalize">
                        {product.trim()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <ServicesSection />
          <TurProgramlari />
          <HotelsSection />
          <FairImagesSection venue={fair?.venue || "Belirtilmemiş"} />

          <div className="" id="fuar-haritası">
            <div>
              <SectionTitle title="Fuar Haritası" />

              <div className="w-full h-96 mt-4">
                <iframe
                  src="https://maps.google.com/maps?q=Istanbul+Expo+Center&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                  height="450"
                  style={{ border: 0 }}
                  aria-hidden="false"
                  title="Fuar Haritası"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 relative py-12">
          <div className="sticky top-4 flex flex-col gap-8">
            <ContactForm from={`${fair.name} Fuarı`} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FuarDetayPage;
