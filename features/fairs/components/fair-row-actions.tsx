"use client";

import { useTransition } from "react";
import Link from "next/link";
import { deleteFairAction } from "@/features/fairs/actions";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface FairRowActionsProps {
  id: string;
  slug: string;
}

export default function FairRowActions({ id, slug }: FairRowActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Bu fuarı silmek istediğinize emin misiniz? Bağlı olan tüm paketler ve programlar da silinecektir."
    );

    if (confirmed) {
      startTransition(async () => {
        const result = await deleteFairAction(id);
        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success("Fuar silindi.");
        }
      });
    }
  };

  return (
    <div className="flex justify-end gap-2">
      {/* View on Site (Preview) */}
      <Link href={`/fairs/${slug}`} target="_blank">
        <Button variant="ghost" size="icon" title="Sitede Gör">
          <ExternalLink className="h-4 w-4 text-slate-400 hover:text-blue-600" />
        </Button>
      </Link>

      {/* Edit */}
      <Link href={`/admin/fairs/${id}/edit`}>
        <Button variant="ghost" size="icon" title="Düzenle">
          <Pencil className="h-4 w-4 text-slate-500 hover:text-blue-600" />
        </Button>
      </Link>

      {/* Delete */}
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
