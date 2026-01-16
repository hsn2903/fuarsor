/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { FairImages } from "@/lib/generated/prisma";
import Image from "next/image";
import SectionTitle from "./section-title";

const FairImagesSection = ({ venue }: { venue: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (index: React.SetStateAction<number>) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const fairImages = {
    images: [
      "/images/fair-image-1.jpg",
      "/images/fair-image-2.jpg",
      "/images/fair-image-3.jpg",
      "/images/fair-image-4.jpg",
    ],
  };

  return (
    <>
      <div className=" bg-white dark:bg-gray-800" id="fuar-resimleri">
        <SectionTitle title="Fuar Resimleri" />
        <div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{venue}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fairImages.images.map((img, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-sm"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={img}
                  alt={`Fuar alanı resmi ${index + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          index={photoIndex}
          slides={fairImages.images.map((src) => ({ src }))}
        />
      )}
    </>
  );
};

export default FairImagesSection;
