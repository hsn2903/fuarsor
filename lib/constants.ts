export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Fuarlarım";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Dünyadaki fuarlardan haberdar olun";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

import { IconType } from "react-icons";
import { MdCabin } from "react-icons/md";

import { TbCaravan, TbTent, TbBuildingCottage } from "react-icons/tb";

import { GiWoodCabin, GiMushroomHouse } from "react-icons/gi";
import { PiWarehouse, PiLighthouse, PiVan } from "react-icons/pi";

import { GoContainer } from "react-icons/go";

/////////////////////////////////////////////////////////////
// PROPERTIES
/////////////////////////////////////////////////////////////

type Category = {
  label: CategoryLabel;
  icon: IconType;
};

export type CategoryLabel =
  | "cabin"
  | "tent"
  | "airstream"
  | "cottage"
  | "container"
  | "caravan"
  | "tiny"
  | "magic"
  | "warehouse"
  | "lodge";

export const categories: Category[] = [
  {
    label: "cabin",
    icon: MdCabin,
  },
  {
    label: "airstream",
    icon: PiVan,
  },
  {
    label: "tent",
    icon: TbTent,
  },
  {
    label: "warehouse",
    icon: PiWarehouse,
  },
  {
    label: "cottage",
    icon: TbBuildingCottage,
  },
  {
    label: "magic",
    icon: GiMushroomHouse,
  },
  {
    label: "container",
    icon: GoContainer,
  },
  {
    label: "caravan",
    icon: TbCaravan,
  },

  {
    label: "tiny",
    icon: PiLighthouse,
  },
  {
    label: "lodge",
    icon: GiWoodCabin,
  },
];

///////////////////////////////////////////////
// Blog Constants
///////////////////////////////////////////////

export const POST_CATEGORIES = [
  "Genel Bilgi",
  "Haberler",
  "Gezi Rehberi",
  "Bilgi Bankası",
  "Diğer",
];

///////////////////////////////////////////////
// Fair Category & Type & Sector
///////////////////////////////////////////////

export const FAIR_CATEGORIES = [
  "Tekstil",
  "Mobilya ve İç dekorasyon",
  "Ağaç ve Ağaç İşçiliği",
  "Gıda",
  "Plastik-Kauçuk ve Ambalaj",
  "Kağıt Matba ve Etiket",
  "Yapı-İnşaat",
  "Makine ve Teknik Malzeme",
  "Deri-Ayakkabı-Kürk",
  "Boya-Kimya-Kimyevi Madde",
  "Otomotiv ve Yan Sanayi",
  "Endüstriyel mutfak ve Ekipman",
  "Enerji, Isı ve Havalandırma",
  "Bilgisayar",
  "Elektrik-Elektronik",
  "Medikal",
  "Hırdavat",
];

export const FAIR_SECTORS = [
  {
    label: "Tekstil",
    subcategories: [
      "Tekstil Konfeksiyon",
      "Ürünler",
      "Moda",
      "Tekstil Makina ve Ekipmanları",
    ],
  },
  {
    label: "Mobilya",
    subcategories: [
      "Mobilya ve İc Dekorasyon",
      "Ağaç ve Ağaç İşçiliği",
      "Ev, Ofis Mobilyaları",
      "Ağaç İşleme",
    ],
  },
  {
    label: "Gıda",
    subcategories: ["Gıda Yiyecek - İçecek", "Gıda ve Teknoloji"],
  },
  {
    label: "Plastik",
    subcategories: [
      "Plastik-Kaucuk ve Ambalaj",
      "Kalıp Makinaları",
      "Kauçuk ve Ambalaj",
    ],
  },
  {
    label: "Matbaa",
    subcategories: [
      "Kağıt",
      "Matbaa ve Etiket",
      "Kağıt ve Matbaa Ürünleri",
      "Etiket",
    ],
  },
  {
    label: "Yapı",
    subcategories: ["Yapı-İnşaat", "İnşaat Malzemeleri", "CAD/CAM"],
  },
  {
    label: "Makine",
    subcategories: [
      "Makina ve Teknik Malzeme",
      "Teknik Malzeme",
      "İmalat",
      "Parça",
    ],
  },
  {
    label: "Deri",
    subcategories: [
      "Deri",
      "Ayakkabı ve Kürk",
      "Ayakkabı",
      "Yan Sanayi",
      "Deri ve Kürk",
    ],
  },
  {
    label: "Kimyasal",
    subcategories: [
      "Boya",
      "Kimya ve Kimyevi Mad.",
      "Boya ve Kimya Sanayi",
      "Kimyasallar",
    ],
  },
  {
    label: "Otomotiv",
    subcategories: [
      "Otomotiv ve Yan Sanayi",
      "Oto Sanayi",
      "Makina ve Ekipmanları",
    ],
  },
  {
    label: "Endüstriyel-Mutfak",
    subcategories: [
      "Endüstriyel Mutfak ve Ekipman",
      "Endüstriyel Mutfak Sistemleri",
    ],
  },
  {
    label: "Enerji",
    subcategories: [
      "Enerji",
      "Isı ve Havalandırma",
      "Isıtma - Klima ve Teknolojisi",
    ],
  },
  {
    label: "Bilgisayar",
    subcategories: ["Bilgisayar", "Yazılım", "Donanım ve Bilişim"],
  },
  {
    label: "Elektrik",
    subcategories: [
      "Elektrik-Elektronik",
      "Kablo",
      "Ev Gereçleri ve Malzemeleri",
    ],
  },
  {
    label: "Medikal",
    subcategories: ["Medika", "Sağlık", "İlaç", "Tıbbi Ekipmanlar"],
  },
  {
    label: "Hırdavat",
    subcategories: ["Hırdavat", "Nalburiye Ürünleri"],
  },
  {
    label: "Diğer",
    subcategories: ["Mücevher", "Hobi", "Hediyelik", "Ticaret"],
  },
];

export const FAIR_TYPES = [
  "Yurtiçi",
  "Çin",
  "Avrupa",
  "Asya",
  "Afrika",
  "Amerika",
];
