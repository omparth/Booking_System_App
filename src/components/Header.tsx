import { CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onAddBooking: () => void;
  onCalendlyClick: () => void;
}

export function Header({ onAddBooking, onCalendlyClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="space-y-1.5 group">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-[0_2px_8px_-2px_rgba(var(--primary),0.2)] dark:bg-primary/20 transition-transform duration-300 group-hover:scale-105">
              <CalendarDays className="h-5 w-5 stroke-[2]" aria-hidden="true" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Studio Bookings
            </h1>
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 sm:pl-13 max-w-xl leading-relaxed">
            Manage studio sessions, track client bookings, and keep your
            schedule organized.
          </p>
        </div>

        <div className="flex flex-row items-center gap-2.5 sm:justify-end">
          <Button 
            variant="outline" 
            onClick={onCalendlyClick}
            className="flex-1 sm:flex-none font-medium border-slate-200 hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 shadow-sm transition-all duration-200 active:scale-[0.98]"
          >
            Book with Calendly
          </Button>
          <Button 
            onClick={onAddBooking}
            className="flex-1 sm:flex-none font-medium gap-1.5 shadow-[0_2px_4px_rgba(0,0,0,0.05)] transition-all duration-200 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
            Add Booking
          </Button>
        </div>
      </div>
    </header>
  );
}