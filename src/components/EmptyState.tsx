import { CalendarOff, SearchX, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  variant: "no-bookings" | "no-results";
  onAddBooking: () => void;
}

export function EmptyState({ variant, onAddBooking }: EmptyStateProps) {
  const isNoBookings = variant === "no-bookings";

  return (
    <div className="flex w-full max-w-xl flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white/60 dark:border-slate-800/80 dark:bg-slate-950/40 px-6 py-14 text-center shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-sm">
      <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/80 dark:from-slate-900 dark:to-slate-900/40 border border-slate-200/60 dark:border-slate-800 shadow-sm">
        <div className="absolute inset-0 rounded-2xl bg-primary/5 scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {isNoBookings ? (
          <CalendarOff className="h-6 w-6 text-slate-600 dark:text-slate-400 animate-pulse duration-[4000ms]" />
        ) : (
          <SearchX className="h-6 w-6 text-slate-600 dark:text-slate-400" />
        )}
      </div>

      <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
        {isNoBookings ? "No bookings yet" : "No matching bookings"}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
        {isNoBookings
          ? "Get started by adding your first studio booking to the dashboard."
          : "Try adjusting your search or filters to find what you're looking for."}
      </p>

      {isNoBookings && (
        <Button 
          className="mt-6 shadow-sm shadow-primary/20 font-medium px-5 transition-all duration-200 hover:shadow-md hover:shadow-primary/20 active:scale-[0.98]" 
          onClick={onAddBooking}
        >
          <Plus className="mr-1.5 h-4 w-4 stroke-[2.5]" aria-hidden="true" />
          Add Booking
        </Button>
      )}
    </div>
  );
}