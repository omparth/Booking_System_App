export type BookingStatus = "Confirmed" | "Pending" | "Cancelled";

export interface Booking {
  id: string;
  studio: string;
  client: string;
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  notes?: string;
}

export type SortOrder = "newest" | "oldest";

export interface BookingFilters {
  search: string;
  status: BookingStatus | "all";
  studio: string;
  sortOrder: SortOrder;
}
