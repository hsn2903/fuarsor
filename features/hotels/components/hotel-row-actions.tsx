"use client";

import { useTransition } from "react";
import { deleteHotelAction } from "@/features/hotels/actions"; // From Ch 7
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

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
          alert(result.error); // Show error if hotel is in use
        }
      });
    }
  };

  return (
    <div className="flex justify-end">
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
