import { useCallback, useState } from "react";
import bookingsData from "@/data/bookings.json";
import type { Booking } from "@/types/booking";

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>(
    bookingsData as Booking[]
  );

  const addBooking = useCallback((booking: Booking) => {
    setBookings((prev) => [...prev, booking]);
  }, []);

  return { bookings, addBooking };
}
