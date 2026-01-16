"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    // Reset pagination to page 1 when searching
    params.set("page", "1");

    startTransition(() => {
      // replace the URL without refreshing the page (Client-side navigation)
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="relative w-full max-w-sm">
      <Input
        placeholder="Search titles..."
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="max-w-sm"
      />
      {isPending && (
        <div className="absolute right-3 top-2.5">
          {/* Tiny spinner to show URL is updating */}
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        </div>
      )}
    </div>
  );
}
