import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function UserTableSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Resim</TableHead>
            <TableHead>Ad</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Kayıt Tarihi</TableHead>
            <TableHead className="text-right">Eylemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Render 5 dummy rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className="hover:bg-transparent">
              <TableCell>
                <Skeleton className="h-9 w-9 rounded-full" />
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-16 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end">
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
