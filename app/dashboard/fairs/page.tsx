import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fuarlarım",
};

const DUMMY_FAIR = {
  name: "Expo 2026",
  slug: "expo-2026",
  description: "Expo 2026",
  summary: "Expo 2026",
  website: "https://expo2026.com",
  venue: "China",
  type: "Çin Fuarı",
  category: "Fuar",
  status: "Beklemede",
  logoImage: "https://expo2026.com/logo.png",
  bannerImage: "https://expo2026.com/banner.png",
  displayedProducts: ["prod 1", "prod 2", "prod 3"],
  tourNote: "Tour Note",
  displayOnBanner: true,
  isFeatured: true,
  isPublished: true,
  isSectoral: true,
  isDefiniteDeparture: true,
  date: "2026-01-01",
  startDate: new Date(),
  endDate: new Date(),

  hotel: {
    name: "Hotel 1",
    description: "Hotel 1",
    images: ["https://hotel1.com/image1.jpg", "https://hotel1.com/image2.jpg"],
  },

  fairImages: {
    name: "Fair Images",
    description: "Fair Images",
    images: ["https://fair1.com/image1.jpg", "https://fair1.com/image2.jpg"],
  },

  tourImages: {
    name: "Tour Images",
    description: "Tour Images",
    images: ["https://tour1.com/image1.jpg", "https://tour1.com/image2.jpg"],
  },

  paidServices: ["paid service 1", "paid service 2"],
  freeServices: ["free service 1", "free service 2"],

  tourPrograms: [
    {
      title1: "Ekonomik Paket",
      title2: "4 Gece 5 Gün",
      title3: "3* Holiday Inn Express",
      activities: [
        {
          day: "1",
          activity: "Activity 1",
        },
        {
          day: "2",
          activity: "Activity 2",
        },
        {
          day: "3",
          activity: "Activity 3",
        },
        {
          day: "4",
          activity: "Activity 4",
        },
        {
          day: "5",
          activity: "Activity 5",
        },
      ],

      onePersonPrice: 100,
      twoPersonPrice: 200,
    },
    {
      title1: "Ekonomik Paket",
      title2: "4 Gece 5 Gün",
      title3: "3* Holiday Inn Express",
      activities: [
        {
          day: "1",
          activity: "Activity 1",
        },
        {
          day: "2",
          activity: "Activity 2",
        },
        {
          day: "3",
          activity: "Activity 3",
        },
        {
          day: "4",
          activity: "Activity 4",
        },
        {
          day: "5",
          activity: "Activity 5",
        },
      ],

      onePersonPrice: 100,
      twoPersonPrice: 200,
    },
  ],

  createdAt: new Date(),
  updatedAt: new Date(),
};

const Page = () => {
  return <div>Page</div>;
};

export default Page;
