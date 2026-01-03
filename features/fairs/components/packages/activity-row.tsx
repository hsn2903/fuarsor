"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ActivityState } from "@/features/fairs/types";

interface ActivityRowProps {
  activity: ActivityState;
  onChange: (field: keyof ActivityState, value: any) => void;
  onRemove: () => void;
}

export default function ActivityRow({
  activity,
  onChange,
  onRemove,
}: ActivityRowProps) {
  return (
    <div className="flex gap-3 items-start">
      {/* Day Number Input */}
      <div className="w-20">
        <Input
          type="number"
          placeholder="Gün"
          value={activity.dayNumber}
          onChange={(e) => onChange("dayNumber", parseInt(e.target.value) || 0)}
          className="h-9"
        />
      </div>

      {/* Description Input */}
      <div className="flex-1">
        <Input
          placeholder="Aktivite açıklaması (örn: İstanbul - Shanghai Uçuşu)"
          value={activity.description}
          onChange={(e) => onChange("description", e.target.value)}
          className="h-9"
        />
      </div>

      {/* Delete Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="h-9 w-9 text-slate-400 hover:text-red-600"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
