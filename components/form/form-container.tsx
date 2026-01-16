"use client";

import { useActionState, useEffect } from "react";
import { actionFunction } from "@/lib/types";
import { toast } from "sonner";

const initialState = {
  message: "",
};

function FormContainer({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      {children}
    </form>
  );
}
export default FormContainer;
