/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import SectionTitle from "./section-title";
import Image from "next/image";
import { Hotel } from "@/app/generated/prisma/client";

const HotelsSection = ({ hotel }: { hotel: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const hotelImages = hotel?.imageUrls || [];
  // const hotelImages = [
  //   "/images/hotel-1.jpg",
  //   "/images/hotel-2.jpg",
  //   "/images/hotel-3.jpg",
  //   "/images/hotel-4.jpg",
  // ];

  const openLightbox = (index: React.SetStateAction<number>) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <div id="otel-resimleri">
        <SectionTitle title="Otel Resimleri" />
        <div className="">
          <h2>{hotel.name}</h2>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {hotel.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hotelImages.map((img: string, index: number) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-sm"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={img}
                  alt={`Otel resmi ${index + 1}`}
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
          slides={hotelImages.map((src: string) => ({ src }))}
        />
      )}
    </>
  );
};

export default HotelsSection;
