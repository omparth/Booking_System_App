import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AddBookingDialog } from "@/components/AddBookingDialog";
import { FilterBar } from "@/components/FilterBar";
import { Header } from "@/components/Header";
import { BookingList } from "@/components/BookingList";
import { Toaster } from "@/components/ui/sonner";
import { useBookings } from "@/hooks/useBookings";
import type { Booking, BookingFilters } from "@/types/booking";

const defaultFilters: BookingFilters = {
  search: "",
  status: "all",
  studio: "all",
  sortOrder: "newest",
};

function filterBookings(bookings: Booking[], filters: BookingFilters): Booking[] {
  const searchLower = filters.search.trim().toLowerCase();

  return bookings
    .filter((booking) => {
      const matchesSearch =
        !searchLower ||
        booking.studio.toLowerCase().includes(searchLower) ||
        booking.client.toLowerCase().includes(searchLower);

      const matchesStatus =
        filters.status === "all" || booking.status === filters.status;

      const matchesStudio =
        filters.studio === "all" || booking.studio === filters.studio;

      return matchesSearch && matchesStatus && matchesStudio;
    })
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) {
        return filters.sortOrder === "newest" ? -dateCompare : dateCompare;
      }
      return filters.sortOrder === "newest"
        ? b.startTime.localeCompare(a.startTime)
        : a.startTime.localeCompare(b.startTime);
    });
}

function App() {
  const { bookings, addBooking } = useBookings();
  const [filters, setFilters] = useState<BookingFilters>(defaultFilters);
  const [dialogOpen, setDialogOpen] = useState(false);

  const studios = useMemo(
    () => [...new Set(bookings.map((b) => b.studio))].sort(),
    [bookings]
  );

  const filteredBookings = useMemo(
    () => filterBookings(bookings, filters),
    [bookings, filters]
  );

  const handleAddBooking = (booking: Booking) => {
    addBooking(booking);
    toast.success("Booking logged successfully", {
      description: `${booking.client} booked ${booking.studio} for ${booking.date}`,
      className: "rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 font-medium shadow-lg",
    });
  };

  const handleCalendlyClick = () => {
    toast.info("Calendly pipeline integration coming soon", {
      description: "This hook is currently simulated and ready for your production API tokens.",
      className: "rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 font-medium shadow-lg",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-50 antialiased selection:bg-primary/10 selection:text-primary">
      <Header
        onAddBooking={() => setDialogOpen(true)}
        onCalendlyClick={handleCalendlyClick}
      />

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-top-2 duration-300">
        
        <FilterBar
          filters={filters}
          studios={studios}
          onFiltersChange={setFilters}
        />

        <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-900 pb-3">
          <div className="space-y-0.5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Active Timeline Matrix
            </h2>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Showing {filteredBookings.length}{" "}
              {filteredBookings.length === 1 ? "registered slot" : "registered slots"}
            </p>
          </div>
        </div>

        <div className="relative rounded-2xl border border-slate-200/50 bg-white/40 dark:border-slate-900/50 dark:bg-slate-950/20 p-1 backdrop-blur-[2px]">
          <BookingList
            bookings={filteredBookings}
            hasBookings={bookings.length > 0}
            onAddBooking={() => setDialogOpen(true)}
          />
        </div>
      </main>

      <AddBookingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleAddBooking}
      />

      <Toaster 
        richColors 
        position="top-right"
        toastOptions={{
          style: {
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)',
          }
        }}
      />
    </div>
  );
}

export default App;