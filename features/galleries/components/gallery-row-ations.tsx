"use client";

import { useTransition } from "react";
import { deleteGalleryAction } from "@/features/galleries/actions"; // From Ch 4
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface GalleryRowActionsProps {
  id: string; // We need the ID to know which gallery to delete
}

export default function GalleryRowActions({ id }: GalleryRowActionsProps) {
  // useTransition allows us to mark the delete action as a "background task"
  // so the UI stays responsive.
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    // Simple browser confirmation
    const confirmed = window.confirm(
      "Bu galeriyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
    );

    if (confirmed) {
      startTransition(async () => {
        await deleteGalleryAction(id);
        // The page will automatically refresh because deleteGalleryAction calls revalidatePath
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
        title="Galeriyi Sil"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
