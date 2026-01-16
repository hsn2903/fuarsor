import MainNav from "@/components/layouts/public/main-nav";
import Image from "next/image";
import FilterForm from "./filter-form";

export default async function HeroSection() {
  return (
    <div className="relative flex flex-col h-screen">
      {/* Background image - lowest layer */}
      <Image
        src="/images/hero.jpg"
        alt="Background"
        fill
        priority
        className="object-cover"
      />
      {/* Overlay - middle layer (semi-transparent) */}
      <div className="absolute inset-0 z-1 bg-gray-900/70 dark:bg-gray-900/80" />
      {/* <div className="absolute inset-0 bg-gray-900 bg-opacity-60 dark:bg-opacity-80 z-1" /> */}

      {/* Content - top layer */}
      <div className="relative z-10">
        <MainNav />
      </div>

      {/* Hero content */}
      <div className="relative z-10 grow flex flex-col justify-center items-center text-center text-gray-100 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Doğru Fuar, Güçlü Gelişim!
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl">
          Sektörüne en uygun fuarları keşfet, büyümeni hızlandır. Fuarlarım ile
          işini dünyaya taşı.
        </p>

        <FilterForm />
      </div>
    </div>
  );
}
