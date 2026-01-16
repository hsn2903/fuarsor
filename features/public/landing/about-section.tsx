import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Link from "next/link";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Dünyanın En İyi Fuarlarını Keşfet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Sektörüne en uygun fuarları kolayca bul, tarih ve konuma göre
              filtrele. Yeni iş fırsatlarını yakala, bağlantılarını güçlendir,
              markanı global pazarda görünür kıl. Fuarlarım ile doğru fuarı seç,
              büyümeni hızlandır.
            </p>
            <Button variant="outline" asChild>
              <Link href="/fuarlar">
                <Info className="mr-2 h-6 w-6" /> Fuarlar
              </Link>
            </Button>
          </div>
          <div className="lg:w-1/2">
            <div className="aspect-video relative rounded-sm overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('/images/info-bg.png')`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
