/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CalendarDays,
  MapPin,
  Euro,
  Users,
  Clock,
  Building,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import SectionTitle from "./section-title";

const fair = {
  name: "TEST FAIR",
  tourPrograms: [
    {
      id: "ekonomik",
      title1: "Ekonomik Paket",
      title2: "4 Gece 5 Gün",
      title3: "3* Holiday Inn Express",
      singlePersonPrice: "890",
      twoPersonPrice: "250",
      programs: [
        {
          date: "1. Gün",
          activity:
            "İstanbul Havalimanı'ndan Guangzhou'ya hareket. Guangzhou Baiyun Havalimanı'nda karşılama ve otele transfer. Akşam Guangzhou şehir turu ve Pearl River tekne turu (opsiyonel).",
        },
        {
          date: "2. Gün",
          activity:
            "Kahvaltı sonrası Canton Fuarı'na transfer. Fuar ziyareti ve B2B görüşmeler. Akşam serbest zaman.",
        },
        {
          date: "3. Gün",
          activity:
            "Kahvaltı sonrası Canton Fuarı'na transfer. Fuar ziyareti ve fabrika ziyaretleri (opsiyonel). Akşam Çin mutfağı deneyimi.",
        },
        {
          date: "4. Gün",
          activity:
            "Kahvaltı sonrası serbest zaman. Chen Clan Ancestral Hall ve Beijing Lu Caddesi alışveriş turu (opsiyonel).",
        },
        {
          date: "5. Gün",
          activity:
            "Kahvaltı sonrası otelden çıkış ve havalimanına transfer. İstanbul'a dönüş.",
        },
      ],
    },
    {
      id: "standart",
      title1: "Standart Paket",
      title2: "5 Gece 6 Gün",
      title3: "4* Landmark Canton Hotel",
      singlePersonPrice: "1190",
      twoPersonPrice: "350",
      programs: [
        {
          date: "1. Gün",
          activity:
            "İstanbul Havalimanı'ndan Guangzhou'ya hareket. Guangzhou Baiyun Havalimanı'nda VIP karşılama ve otele transfer. Akşam Canton Kulesi ziyareti.",
        },
        {
          date: "2. Gün",
          activity:
            "Kahvaltı sonrası Canton Fuarı'na özel transfer. Fuar ziyareti ve rehber eşliğinde B2B görüşmeler. Akşam Dim Sum workshop.",
        },
        {
          date: "3. Gün",
          activity:
            "Kahvaltı sonrası Canton Fuarı'na transfer. Fuar ziyareti ve seçili tedarikçi fabrika ziyaretleri. Akşam Pearl River tekne turu.",
        },
        {
          date: "4. Gün",
          activity:
            "Kahvaltı sonrası Canton Fuarı'na transfer. Fuar ziyareti ve B2B görüşmeler. Akşam Guangzhou Opera House turu (opsiyonel).",
        },
        {
          date: "5. Gün",
          activity:
            "Kahvaltı sonrası Shamian Adası ve Chen Clan Ancestral Hall kültür turu. Öğleden sonra serbest zaman ve alışveriş imkanı.",
        },
        {
          date: "6. Gün",
          activity:
            "Kahvaltı sonrası otelden çıkış ve havalimanına transfer. İstanbul'a dönüş.",
        },
      ],
    },
    {
      id: "vip",
      title1: "VIP Paket",
      title2: "6 Gece 7 Gün",
      title3: "5* The Garden Hotel",
      singlePersonPrice: "1690",
      twoPersonPrice: "450",
      programs: [
        {
          date: "1. Gün",
          activity:
            "Business Class ile İstanbul-Guangzhou uçuşu. VIP karşılama ve limuzin ile otele transfer. Akşam özel Kanton yemeği deneyimi.",
        },
        {
          date: "2. Gün",
          activity:
            "Kahvaltı sonrası özel araç ile Canton Fuarı'na transfer. VIP giriş ve özel B2B görüşme alanı. Akşam Canton Kulesi'nde akşam yemeği.",
        },
        {
          date: "3. Gün",
          activity:
            "Kahvaltı sonrası fuar ziyareti ve premium tedarikçi fabrika ziyaretleri. Tercüman eşliğinde özel görüşmeler.",
        },
        {
          date: "4. Gün",
          activity:
            "Kahvaltı sonrası fuar ziyareti. Öğleden sonra Guangzhou şehir turu ve çay seremonisi deneyimi.",
        },
        {
          date: "5. Gün",
          activity:
            "Kahvaltı sonrası fuar ziyareti. Akşam Pearl River'da özel yat turu ve Michelin yıldızlı restoranda akşam yemeği.",
        },
        {
          date: "6. Gün",
          activity:
            "Kahvaltı sonrası Shenzhen teknoloji bölgesi turu. Akşam geleneksel Çin tıbbı ve spa deneyimi.",
        },
        {
          date: "7. Gün",
          activity:
            "Kahvaltı sonrası serbest zaman ve alışveriş. VIP transfer ile havalimanına uğurlama ve İstanbul'a dönüş.",
        },
      ],
    },
  ],
};

function TourProgramCard({ tourProgram }: { tourProgram: any }) {
  const {
    title1,
    title2,
    title3,
    programs,
    singlePersonPrice,
    twoPersonPrice,
  } = tourProgram;

  return (
    <div className="overflow-hidden border shadow p-4" id="tur-programları">
      <header className="mb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-lg bg-primary/60">
              {title1}
            </Badge>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-base gap-4">
              <div className="flex items-center gap-1.5">
                <Clock size={16} className="text-gray-500 dark:text-gray-400" />
                {title2}
              </div>
              <div className="flex items-center gap-1.5">
                <Building
                  size={16}
                  className="text-gray-500 dark:text-gray-400"
                />
                {title3}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-0">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {programs?.map((program: any, idx: any) => (
            <div
              key={idx}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
            >
              <div className="grid grid-cols-[20px_100px_1fr] gap-4">
                <div className="flex-shrink-0 mt-1">
                  <MapPin
                    className="text-gray-400 dark:text-gray-500"
                    size={18}
                  />
                </div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 text-lg">
                  {program.date}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                  {program.activity}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 mt-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Users size={18} />
              <span className="text-base">İki Kişilik Odada Kişi Başı</span>
            </div>
            <div className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1">
              <Euro size={16} />
              <span className="text-lg">{singlePersonPrice.toString()} €</span>
            </div>
          </div>

          <Separator className="my-2 dark:bg-gray-700" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Users size={18} />
              <span className="text-base">Tek Kişilik Oda Farkı</span>
            </div>
            <div className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1">
              <Euro size={16} />
              <span className="text-lg">{twoPersonPrice.toString()} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TurProgramlari() {
  return (
    <section id="tour-programs" className="py-4">
      <SectionTitle title="Tur Programları" />

      <div className="flex flex-col">
        {fair.tourPrograms.map((program: any) => (
          <div key={program.id} className="mb-4">
            <TourProgramCard tourProgram={program} />
          </div>
        ))}
      </div>
    </section>
  );
}
