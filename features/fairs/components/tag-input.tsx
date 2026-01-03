"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TagInputProps {
  placeholder: string;
  tags: string[];
  setTags: (tags: string[]) => void;
}

export default function TagInput({
  placeholder,
  tags,
  setTags,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      addTag();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <Button type="button" onClick={addTag} variant="secondary">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="px-2 py-1 text-sm gap-1 hover:bg-slate-200"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-slate-500 hover:text-red-600 focus:outline-none"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {tags.length === 0 && (
          <span className="text-xs text-muted-foreground italic">
            Henüz eklenmedi.
          </span>
        )}
      </div>
    </div>
  );
}
