import { BookingCard } from "@/components/BookingCard";
import { EmptyState } from "@/components/EmptyState";
import type { Booking } from "@/types/booking";

interface BookingListProps {
  bookings: Booking[];
  hasBookings: boolean;
  onAddBooking: () => void;
}

export function BookingList({
  bookings,
  hasBookings,
  onAddBooking,
}: BookingListProps) {
  if (bookings.length === 0) {
    return (
      <div className="animate-in fade-in-50 duration-300 ease-out min-h-[350px] flex items-center justify-center">
        <EmptyState
          variant={hasBookings ? "no-results" : "no-bookings"}
          onAddBooking={onAddBooking}
        />
      </div>
    );
  }

  return (
    <ul 
      className="grid gap-4 md:gap-5 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" 
      aria-label="Bookings list"
    >
      {bookings.map((booking, index) => (
        <li 
          key={booking.id}
          className="animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out"
          style={{
            animationDelay: `${Math.min(index * 40, 300)}ms`,
            animationFillMode: "both",
          }}
        >
          <BookingCard booking={booking} />
        </li>
      ))}
    </ul>
  );
}