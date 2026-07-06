"use client";

import React, { useRef, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
}

function SearchBar({ onSearch, className }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query.trim());
  };

  return (
    <div ref={wrapperRef} className={cn("relative flex-1 max-w-md mx-auto", className)}>
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full overflow-hidden rounded-full border border-gray-300 bg-white transition-colors focus-within:border-ushop-purple focus-within:ring-2 focus-within:ring-ushop-purple/20"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products, categories..."
          className="flex-1 px-5 py-2.5 text-sm bg-transparent outline-none placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-ushop-purple text-white rounded-full mr-1 hover:bg-ushop-purple-dark transition-colors flex items-center justify-center shrink-0"
          aria-label="Submit search"
        >
          <Search className="w-5 h-5" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
