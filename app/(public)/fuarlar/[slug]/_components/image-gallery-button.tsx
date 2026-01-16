/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Button } from "@/components/ui/button";
import { ImagesIcon } from "lucide-react";

const ImageGalleryButton = () => {
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
      <Button
        className="absolute bottom-4 right-10 cursor-pointer"
        size="lg"
        onClick={() => setIsOpen(true)}
      >
        <ImagesIcon /> Galeri
      </Button>

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

export default ImageGalleryButton;
