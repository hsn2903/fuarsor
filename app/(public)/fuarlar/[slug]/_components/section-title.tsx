import { LucideIcon } from "lucide-react";

type SectionTitleProps = {
  title: string;
  icon?: LucideIcon;
};

const SectionTitle = ({ title, icon: Icon }: SectionTitleProps) => {
  return (
    <div className="flex items-center gap-3 mb-6 border-l-6 border-l-primary/60 pl-2">
      {Icon && <Icon className="text-primary w-6 h-6" />}
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
};

export default SectionTitle;
