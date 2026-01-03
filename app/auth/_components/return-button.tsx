import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const ReturnButton = ({ href, label }: { href: string; label: string }) => {
  return (
    <Button size="icon" asChild>
      <Link href={href}>
        <ArrowLeftIcon />
        <span>{label}</span>
      </Link>
    </Button>
  );
};

export default ReturnButton;
