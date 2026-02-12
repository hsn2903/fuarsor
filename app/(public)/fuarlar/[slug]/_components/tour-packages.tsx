import {
  BuildingIcon,
  ClockIcon,
  EuroIcon,
  MapPinIcon,
  UsersIcon,
} from "lucide-react";
import SectionTitle from "./section-title";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const TourProgramCard = ({ tourProgram }: { tourProgram: any }) => {
  console.log("tourProgram", tourProgram);
  return (
    <div className="overflow-hidden border shadow p-4" id="tur-programları">
      <header className="mb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-lg bg-primary/60">
              {tourProgram.name}
            </Badge>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-base gap-4">
              <div className="flex items-center gap-1.5">
                <ClockIcon
                  size={16}
                  className="text-gray-500 dark:text-gray-400"
                />
                {tourProgram.duration}
              </div>
              <div className="flex items-center gap-1.5">
                <BuildingIcon
                  size={16}
                  className="text-gray-500 dark:text-gray-400"
                />
                {tourProgram.description}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-0">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {tourProgram.activities?.map((program: any, idx: any) => (
            <div
              key={idx}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
            >
              <div className="grid grid-cols-[20px_100px_1fr] gap-4">
                <div className="shrink-0 mt-1">
                  <MapPinIcon
                    className="text-gray-400 dark:text-gray-500"
                    size={18}
                  />
                </div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 text-lg">
                  {program.dayNumber}. Gün
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                  {program.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 mt-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <UsersIcon size={18} />
              <span className="text-base">İki Kişilik Odada Kişi Başı</span>
            </div>
            <div className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1">
              <EuroIcon size={16} />
              <span className="text-lg">
                {tourProgram.priceDouble?.toString() || "0"} €
              </span>
            </div>
          </div>

          <Separator className="my-2 dark:bg-gray-700" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <UsersIcon size={18} />
              <span className="text-base">Tek Kişilik Oda Farkı</span>
            </div>
            <div className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1">
              <EuroIcon size={16} />
              <span className="text-lg">
                {tourProgram.priceSingle?.toString() || "0"} €
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TourPackages = ({ tourPackages }: { tourPackages: any }) => {
  return (
    <section id="tour-programs" className="py-4">
      <SectionTitle title="Tur Programları" />

      <div className="flex flex-col">
        {tourPackages.map((program: any) => (
          <div key={program.id} className="mb-4">
            <TourProgramCard tourProgram={program} />
          </div>
        ))}
      </div>
    </section>
  );
};
export default TourPackages;
