"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";

export function UserSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    // Convert to standard URLSearchParams object to edit it
    const params = new URLSearchParams(searchParams.toString());

    // Reset to page 1 when searching so we don't end up on empty page 5
    params.set("page", "1");

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    // Update URL
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Search by name or email..."
        onChange={(e) => handleSearch(e.target.value)}
        // distinct defaultValue to avoid controlled/uncontrolled input warnings
        defaultValue={searchParams.get("search")?.toString()}
        className="max-w-sm"
      />
    </div>
  );
}
