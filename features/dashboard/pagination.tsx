import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string; // To make this reusable for other lists
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
        Page {currentPage} of {totalPages}
      </span>

      <Button variant="outline" size="sm" disabled={!hasPrev} asChild={hasPrev}>
        {hasPrev ? (
          <Link href={`${baseUrl}?page=${currentPage - 1}`}>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Link>
        ) : (
          <span>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </span>
        )}
      </Button>

      <Button variant="outline" size="sm" disabled={!hasNext} asChild={hasNext}>
        {hasNext ? (
          <Link href={`${baseUrl}?page=${currentPage + 1}`}>
            Next
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            Next
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </div>
  );
}
