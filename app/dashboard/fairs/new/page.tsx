import { Metadata } from "next";
import FairForm from "./_components/fair-form";
import { getHotelOptions } from "@/features/hotels/actions";
import { getGalleryOptions } from "@/features/galleries/actions";

export const metadata: Metadata = {
  title: "Yeni Fuar",
};

const Page = async () => {
  // Fetch hotels on the server
  const hotels = await getHotelOptions();
  const galleries = await getGalleryOptions(); // Fetch galleries

  return (
    <div>
      Yeni Fuar return{" "}
      <FairForm hotelOptions={hotels} galleryOptions={galleries} />;
    </div>
  );
};

export default Page;
