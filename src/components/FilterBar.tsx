import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { BookingFilters, BookingStatus } from "@/types/booking";

interface FilterBarProps {
  filters: BookingFilters;
  studios: string[];
  onFiltersChange: (filters: BookingFilters) => void;
}

const STATUS_OPTIONS: { value: BookingStatus | "all"; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "Confirmed", label: "Confirmed" },
  { value: "Pending", label: "Pending" },
  { value: "Cancelled", label: "Cancelled" },
];

export function FilterBar({
  filters,
  studios,
  onFiltersChange,
}: FilterBarProps) {
  const updateFilter = <K extends keyof BookingFilters>(
    key: K,
    value: BookingFilters[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <section
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.02)] dark:border-slate-800/80 dark:bg-slate-950 transition-all duration-200"
      aria-label="Booking filters"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2 sm:col-span-2 lg:col-span-1">
          <Label 
            htmlFor="search" 
            className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
          >
            Search
          </Label>
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-primary"
              aria-hidden="true"
            />
            <Input
              id="search"
              type="search"
              placeholder="Search studio or client..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className={cn(
                "pl-9 bg-slate-50/50 border-slate-200 focus-visible:bg-white dark:bg-slate-900/40 dark:border-slate-800 dark:focus-visible:bg-slate-950 shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)] transition-all duration-200"
              )}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label 
            htmlFor="status-filter" 
            className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
          >
            Status
          </Label>
          <Select
            value={filters.status}
            onValueChange={(value) =>
              updateFilter("status", value as BookingStatus | "all")
            }
          >
            <SelectTrigger 
              id="status-filter" 
              className="bg-slate-50/50 border-slate-200 dark:bg-slate-900/40 dark:border-slate-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)]"
            >
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="border-slate-200/80 dark:border-slate-800/80">
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-sm">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label 
            htmlFor="studio-filter" 
            className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
          >
            Studio
          </Label>
          <Select
            value={filters.studio}
            onValueChange={(value) => updateFilter("studio", value)}
          >
            <SelectTrigger 
              id="studio-filter" 
              className="bg-slate-50/50 border-slate-200 dark:bg-slate-900/40 dark:border-slate-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)]"
            >
              <SelectValue placeholder="Filter by studio" />
            </SelectTrigger>
            <SelectContent className="border-slate-200/80 dark:border-slate-800/80">
              <SelectItem value="all" className="text-sm">All Studios</SelectItem>
              {studios.map((studio) => (
                <SelectItem key={studio} value={studio} className="text-sm">
                  {studio}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label 
            htmlFor="sort-order" 
            className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
          >
            Sort by Date
          </Label>
          <Select
            value={filters.sortOrder}
            onValueChange={(value) =>
              updateFilter("sortOrder", value as BookingFilters["sortOrder"])
            }
          >
            <SelectTrigger 
              id="sort-order" 
              className="bg-slate-50/50 border-slate-200 dark:bg-slate-900/40 dark:border-slate-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)]"
            >
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent className="border-slate-200/80 dark:border-slate-800/80">
              <SelectItem value="newest" className="text-sm">Newest First</SelectItem>
              <SelectItem value="oldest" className="text-sm">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}