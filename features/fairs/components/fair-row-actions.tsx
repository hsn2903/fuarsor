"use client";

import { useTransition } from "react";
import { deleteFairAction } from "@/features/fairs/actions";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import Link from "next/link";

interface FairRowActionsProps {
  id: string;
}

export default function FairRowActions({ id }: FairRowActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (
      confirm("Bu fuarı ve tüm paketlerini silmek istediğinize emin misiniz?")
    ) {
      startTransition(async () => {
        await deleteFairAction(id);
      });
    }
  };

  return (
    <div className="flex justify-end gap-2">
      {/* Edit Button (Placeholder for now) */}
      <Link href={`/admin/fairs/${id}/edit`}>
        <Button variant="ghost" size="icon" title="Düzenle">
          <Pencil className="h-4 w-4 text-slate-500" />
        </Button>
      </Link>

      {/* Delete Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        disabled={isPending}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
        title="Sil"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
