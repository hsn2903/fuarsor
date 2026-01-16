"use client";

import { useTransition } from "react";
import Link from "next/link";
import { deleteHotelAction } from "@/features/hotels/actions";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";

export default function HotelRowActions({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Bu oteli silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
    );

    if (confirmed) {
      startTransition(async () => {
        const result = await deleteHotelAction(id);
        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success("Otel silindi.");
        }
      });
    }
  };

  return (
    <div className="flex justify-end gap-2">
      <Link href={`/admin/hotels/${id}/edit`}>
        <Button variant="ghost" size="icon" title="Düzenle">
          <Pencil className="h-4 w-4 text-slate-500 hover:text-blue-600" />
        </Button>
      </Link>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        disabled={isPending}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
        title="Oteli Sil"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
