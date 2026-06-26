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
      className="w-full transition-all duration-300 ease-out"
      aria-label="Booking filters"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Search Field */}
        <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
          <Label 
            htmlFor="search" 
            className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500"
          >
            Search Matrix
          </Label>
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400/80 transition-colors duration-200 group-focus-within:text-slate-800 dark:group-focus-within:text-slate-200"
              aria-hidden="true"
            />
            <Input
              id="search"
              type="search"
              placeholder="Studio or client..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className={cn(
                "pl-9 h-9 text-xs bg-slate-50/40 border-slate-200/60 focus-visible:bg-white dark:bg-slate-950/40 dark:border-slate-800/60 dark:focus-visible:bg-slate-950 shadow-none transition-all duration-200 rounded-xl focus-visible:ring-1 focus-visible:ring-slate-400/60 dark:focus-visible:ring-slate-700/60 focus-visible:border-transparent"
              )}
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-1.5">
          <Label 
            htmlFor="status-filter" 
            className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500"
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
              className="h-9 text-xs bg-slate-50/40 border-slate-200/60 dark:bg-slate-950/40 dark:border-slate-800/60 shadow-none rounded-xl focus:ring-1 focus:ring-slate-400/60 dark:focus:ring-slate-700/60 transition-all duration-200 text-slate-700 dark:text-slate-300 font-medium"
            >
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] z-50 p-1 min-w-[8rem] overflow-hidden">
              {STATUS_OPTIONS.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value} 
                  className="text-xs text-slate-700 dark:text-slate-300 rounded-lg py-2 pl-8 pr-2 relative font-medium transition-colors focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-slate-50 data-[state=checked]:bg-slate-50 dark:data-[state=checked]:bg-slate-800/50"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Studio Filter */}
        <div className="space-y-1.5">
          <Label 
            htmlFor="studio-filter" 
            className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500"
          >
            Studio Profile
          </Label>
          <Select
            value={filters.studio}
            onValueChange={(value) => updateFilter("studio", value)}
          >
            <SelectTrigger 
              id="studio-filter" 
              className="h-9 text-xs bg-slate-50/40 border-slate-200/60 dark:bg-slate-950/40 dark:border-slate-800/60 shadow-none rounded-xl focus:ring-1 focus:ring-slate-400/60 dark:focus:ring-slate-700/60 transition-all duration-200 text-slate-700 dark:text-slate-300 font-medium"
            >
              <SelectValue placeholder="Filter by studio" />
            </SelectTrigger>
            <SelectContent className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] z-50 p-1 min-w-[8rem] overflow-hidden">
              <SelectItem value="all" className="text-xs text-slate-700 dark:text-slate-300 rounded-lg py-2 pl-8 pr-2 relative font-medium transition-colors focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-slate-50 data-[state=checked]:bg-slate-50 dark:data-[state=checked]:bg-slate-800/50">
                All Studios
              </SelectItem>
              {studios.map((studio) => (
                <SelectItem 
                  key={studio} 
                  value={studio} 
                  className="text-xs text-slate-700 dark:text-slate-300 rounded-lg py-2 pl-8 pr-2 relative font-medium transition-colors focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-slate-50 data-[state=checked]:bg-slate-50 dark:data-[state=checked]:bg-slate-800/50"
                >
                  {studio}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order */}
        <div className="space-y-1.5">
          <Label 
            htmlFor="sort-order" 
            className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500"
          >
            Chronology
          </Label>
          <Select
            value={filters.sortOrder}
            onValueChange={(value) =>
              updateFilter("sortOrder", value as BookingFilters["sortOrder"])
            }
          >
            <SelectTrigger 
              id="sort-order" 
              className="h-9 text-xs bg-slate-50/40 border-slate-200/60 dark:bg-slate-950/40 dark:border-slate-800/60 shadow-none rounded-xl focus:ring-1 focus:ring-slate-400/60 dark:focus:ring-slate-700/60 transition-all duration-200 text-slate-700 dark:text-slate-300 font-medium"
            >
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] z-50 p-1 min-w-[8rem] overflow-hidden">
              <SelectItem value="newest" className="text-xs text-slate-700 dark:text-slate-300 rounded-lg py-2 pl-8 pr-2 relative font-medium transition-colors focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-slate-50 data-[state=checked]:bg-slate-50 dark:data-[state=checked]:bg-slate-800/50">
                Newest First
              </SelectItem>
              <SelectItem value="oldest" className="text-xs text-slate-700 dark:text-slate-300 rounded-lg py-2 pl-8 pr-2 relative font-medium transition-colors focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-slate-50 data-[state=checked]:bg-slate-50 dark:data-[state=checked]:bg-slate-800/50">
                Oldest First
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>
    </section>
  );
}