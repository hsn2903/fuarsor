import FairForm from "@/features/fairs/components/fair-form";
import { getHotelOptions } from "@/features/hotels/actions";
import { getGalleryOptions } from "@/features/galleries/actions";

const NewFairPage = async () => {
  const hotels = await getHotelOptions();
  const galleries = await getGalleryOptions();

  return (
    <div>
      <FairForm hotelOptions={hotels} galleryOptions={galleries} />
    </div>
  );
};

export default NewFairPage;
