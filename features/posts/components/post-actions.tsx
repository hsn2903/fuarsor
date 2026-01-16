"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"; // Import toast
import { deletePost } from "../actions";

export function DeletePostButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePostWithId = deletePost.bind(null, id);

  return (
    <form
      action={async () => {
        setIsDeleting(true);
        try {
          await deletePostWithId();
          toast.success("Post deleted successfully");
        } catch (err) {
          toast.error("Failed to delete post");
        } finally {
          setIsDeleting(false);
        }
      }}
      onSubmit={(e) => {
        if (!confirm("Are you sure you want to delete this post?")) {
          e.preventDefault();
        }
      }}
    >
      <Button
        variant="destructive"
        size="sm"
        type="submit"
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}
