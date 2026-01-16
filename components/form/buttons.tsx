"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { LucidePenSquare, LucideTrash2, RotateCwIcon } from "lucide-react";

type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

export function SubmitButton({
  className = "",
  text = "Gönder",
  size = "lg",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={`capitalize ${className} cursor-pointer`}
      size={size}
    >
      {pending ? (
        <>
          <RotateCwIcon className="mr-2 h-4 w-4 animate-spin" />
          Lütfen bekleyin...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

type actionType = "edit" | "delete";
export const IconButton = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus();

  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return <LucidePenSquare />;
      case "delete":
        return <LucideTrash2 />;
      default:
        const never: never = actionType;
        throw new Error(`Invalid action type: ${never}`);
    }
  };

  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className="p-2 cursor-pointer"
    >
      {pending ? <RotateCwIcon className=" animate-spin" /> : renderIcon()}
    </Button>
  );
};
