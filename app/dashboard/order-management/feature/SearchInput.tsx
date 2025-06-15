"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ searchTerm, onSearchChange, placeholder = "Search order..." }: SearchInputProps) {
  return (
    <div className="flex items-center space-x-2 max-w-sm">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
    </div>
  );
}