"use client";

import { Fair } from "@/app/generated/prisma/client";
import Pagination from "./pagination";
import { FairCard } from "@/features/public/fairs/fair-card";

interface FairsListProps {
  fairs: Fair[];
  total: number;
  page: number;
  limit: number;
}

export default function FairsList({
  fairs,
  total,
  page,
  limit,
}: FairsListProps) {
  return (
    <div className="w-full md:w-3/4">
      {fairs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Aradığınız kriterlere uygun fuar bulunamadı.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {fairs.map((fair) => (
              <FairCard key={fair.id} fair={fair} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(total / limit)}
            />
          </div>
        </>
      )}
    </div>
  );
}
