import { CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onAddBooking: () => void;
  onCalendlyClick: () => void;
}

export function Header({ onAddBooking, onCalendlyClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/40 bg-white/40 backdrop-blur-xl dark:border-slate-900/50 dark:bg-[#090b0f]/40 transition-all duration-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        
        <div className="space-y-1 group">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-slate-800/40 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-primary/30">
              <CalendarDays className="h-4 w-4 text-slate-800 dark:text-slate-200 stroke-[1.75]" aria-hidden="true" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Studio Bookings
            </h1>
          </div>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 max-w-xl leading-relaxed pl-12 sm:pl-12">
            Manage studio sessions, track client bookings, and keep your schedule organized.
          </p>
        </div>

        <div className="flex flex-row items-center gap-2 sm:justify-end">
          <Button 
            variant="outline" 
            onClick={onCalendlyClick}
            className="flex-1 sm:flex-none text-xs font-semibold px-4 h-9 border-slate-200/60 bg-white/50 hover:bg-slate-50/80 text-slate-700 dark:border-slate-800/80 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:bg-slate-900 shadow-none transition-all duration-200 active:scale-[0.98] rounded-xl"
          >
            Book with Calendly
          </Button>
          <Button 
            onClick={onAddBooking}
            className="flex-1 sm:flex-none text-xs font-semibold px-4 h-9 gap-1.5 bg-gradient-to-b from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white dark:from-slate-50 dark:to-slate-100 dark:text-slate-900 dark:hover:from-white dark:hover:to-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.05)] transition-all duration-200 active:scale-[0.98] rounded-xl border-none"
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
            Add Booking
          </Button>
        </div>

      </div>
    </header>
  );
}
