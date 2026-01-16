import { Metadata } from "next";
import { Suspense } from "react";
import FairsList from "./_components/fairs-list";
import { getFairsWithParams } from "@/app/_actions/fairs";
import FairsFilter from "./_components/fairs-filter";
import { parseSearchParams } from "@/lib/search-utils";
import LoadingTable from "@/components/shared/loading-table";

export const metadata: Metadata = {
  title: "Tüm Organizasyonlar",
  description: "Dünyadaki güncel fuarların tam listesi",
};

const FuarlarPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const parsedParams = parseSearchParams(
    new URLSearchParams((await searchParams) as Record<string, string>)
  );
  const { fairs, total } = await getFairsWithParams({
    page: parseInt(parsedParams.page || "1"),
    limit: parseInt(parsedParams.limit || "12"),
    filters: {
      name: parsedParams.fuarIsmi,
      category: parsedParams.fuarKategori,
      type: parsedParams.fuarTur,
    },
  });

  return (
    <div>
      <header className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Fuarlar</h1>
          <p className="mt-2 text-gray-300">
            Dünyadaki güncel fuarların tam listesi
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-4">
        <FairsFilter initialFilters={parsedParams} />

        <Suspense fallback={<LoadingTable />}>
          <FairsList
            fairs={fairs}
            total={total}
            page={parseInt(parsedParams.page || "1")}
            limit={parseInt(parsedParams.limit || "12")}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default FuarlarPage;
