import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-end gap-2 mt-4">
      <span className="text-sm text-muted-foreground mr-4">
        {currentPage} / {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        className="cursor-pointer w-24"
        disabled={!hasPrev}
        asChild={hasPrev}
      >
        {hasPrev ? (
          <Link
            href={`${baseUrl}?page=${currentPage - 1}`}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Önceki
          </Link>
        ) : (
          <span className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Önceki
          </span>
        )}
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="cursor-pointer w-24"
        disabled={!hasNext}
        asChild={hasNext}
      >
        {hasNext ? (
          <Link
            href={`${baseUrl}?page=${currentPage + 1}`}
            className="flex items-center gap-2"
          >
            Sonraki
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="flex items-center gap-2">
            Sonraki
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </div>
  );
}
