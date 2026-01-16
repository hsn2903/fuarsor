"use client";

import { useTransition } from "react";
import Link from "next/link"; // <--- Add this
import { deleteGalleryAction } from "@/features/galleries/actions";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react"; // <--- Add Pencil icon
import { toast } from "sonner";

export default function GalleryRowActions({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    // ... existing delete logic ...
    const confirmed = window.confirm(
      "Bu galeriyi silmek istediğinize emin misiniz?"
    );
    if (confirmed) {
      startTransition(async () => {
        const result = await deleteGalleryAction(id);
        if (result.error) toast.error(result.error);
        else toast.success("Galeri silindi.");
      });
    }
  };

  return (
    <div className="flex justify-end gap-2">
      {" "}
      {/* Added gap-2 */}
      {/* NEW: Edit Button */}
      <Link href={`/admin/galleries/${id}/edit`}>
        <Button variant="ghost" size="icon" title="Düzenle">
          <Pencil className="h-4 w-4 text-slate-500 hover:text-blue-600" />
        </Button>
      </Link>
      {/* Existing Delete Button */}
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
