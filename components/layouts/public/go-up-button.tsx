"use client";
import { Button } from "@/components/ui/button";
import { FaArrowUp } from "react-icons/fa";

const GoUpButton = () => {
  const handleGoUpClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      className="cursor-pointer fixed bottom-4 right-4"
      size="lg"
      onClick={handleGoUpClick}
    >
      <FaArrowUp className="text-xl" />
    </Button>
  );
};

export default GoUpButton;
