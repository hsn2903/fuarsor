"use client";

import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { toast } from "sonner"; // Import toast
import { togglePostStatus } from "../actions";

interface StatusToggleProps {
  id: string;
  isPublished: boolean;
}

export function StatusToggle({ id, isPublished }: StatusToggleProps) {
  const [isPending, startTransition] = useTransition();

  function handleToggle(checked: boolean) {
    // startTransition allows the UI to remain interactive during the server request
    startTransition(async () => {
      try {
        await togglePostStatus(id, checked);
        // Success Toast
        toast.success(`Post ${checked ? "published" : "unpublished"}`);
      } catch (error) {
        // Error Toast
        toast.error("Failed to update status");
      }
    });
  }

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isPublished}
        onCheckedChange={handleToggle}
        disabled={isPending}
      />
      <span className="text-sm text-muted-foreground min-w-[70px]">
        {isPublished ? "Published" : "Draft"}
      </span>
    </div>
  );
}
