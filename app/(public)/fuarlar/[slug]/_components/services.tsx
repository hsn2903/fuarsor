import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import SectionTitle from "./section-title";

const ServicesSection = () => {
  // Sample data
  const sampleData = {
    freeServices:
      "WiFi,Otopark,Vale Hizmeti,Çay ve Kahve Servisi,Vestiyer,Bebek Bakım Odası",
    paidServices:
      "Özel Şoför,VIP Transfer,Tercüman,Organizasyon Planlama,Catering Hizmeti,Spa Hizmetleri",
  };

  return (
    <div id="hizmetler">
      <SectionTitle title="Hizmetlerimiz" />

      <div className="">
        <div id="services-section">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ücretsiz Hizmetler */}
            <div className="border border-secondary p-4 shadow">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                Ücretsiz Hizmetlerimiz
              </h2>
              <ul className="space-y-3">
                {sampleData.freeServices.split(",").map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>{item.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ücretli Hizmetler */}
            <div className="border border-secondary p-4 shadow">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                Ücretli Hizmetlerimiz
              </h2>
              <ul className="space-y-3">
                {sampleData.paidServices.split(",").map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>{item.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
