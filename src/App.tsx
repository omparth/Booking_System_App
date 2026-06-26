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
      className: "rounded-2xl border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 font-medium shadow-xl backdrop-blur-xl",
    });
  };

  const handleCalendlyClick = () => {
    toast.info("Calendly pipeline integration coming soon", {
      description: "This hook is currently simulated and ready for your production API tokens.",
      className: "rounded-2xl border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 font-medium shadow-xl backdrop-blur-xl",
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#090b0f] text-slate-900 dark:text-slate-100 antialiased selection:bg-primary/10 selection:text-primary relative overflow-x-hidden">
      {/* Premium background soft glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-slate-100 to-transparent dark:from-slate-900/30 dark:to-transparent pointer-events-none blur-3xl opacity-70" />
      
      <Header
        onAddBooking={() => setDialogOpen(true)}
        onCalendlyClick={handleCalendlyClick}
      />

      <main className="relative mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-top-4 duration-500 ease-out">
        
        {/* Filter Section Card wrap for premium layout */}
        <div className="bg-white/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-sm">
          <FilterBar
            filters={filters}
            studios={studios}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Section Header */}
        <div className="flex items-end justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
          <div className="space-y-1.5">
            <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500">
              Active Timeline Matrix
            </h2>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Showing <span className="font-semibold text-slate-900 dark:text-slate-100">{filteredBookings.length}</span>{" "}
              {filteredBookings.length === 1 ? "registered slot" : "registered slots"}
            </p>
          </div>
        </div>

        {/* Premium Main Content Card container */}
        <div className="relative rounded-2xl border border-slate-200/60 bg-white/70 dark:border-slate-900/60 dark:bg-slate-950/40 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] backdrop-blur-md transition-all duration-300">
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
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)',
            borderRadius: '1rem',
          }
        }}
      />
    </div>
  );
}

export default App;