import { Skeleton } from "@/components/ui/skeleton";
import { UserTableSkeleton } from "@/features/users/components/user-table-skeleton";

export default function Loading() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-28" />
      </div>

      {/* Search Bar Skeleton */}
      <div className="flex items-center py-4">
        <Skeleton className="h-10 w-full max-w-sm" />
      </div>

      {/* The Table Skeleton */}
      <UserTableSkeleton />

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
}
