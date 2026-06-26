import {
  Building2,
  Calendar,
  Clock,
  StickyNote,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatTime } from "@/lib/utils";
import type { Booking, BookingStatus } from "@/types/booking";

interface BookingCardProps {
  booking: Booking;
}

const statusVariant: Record<
  BookingStatus,
  "confirmed" | "pending" | "cancelled"
> = {
  Confirmed: "confirmed",
  Pending: "pending",
  Cancelled: "cancelled",
};

export function BookingCard({ booking }: BookingCardProps) {
  return (
    <article className="group relative rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] dark:border-slate-800/80 dark:bg-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-[0_12px_20px_-8px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.4)]">
      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-4 flex-1">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 dark:bg-slate-900 dark:border-slate-800 text-primary group-hover:scale-105 transition-transform duration-300">
              <Building2 className="h-4 w-4" aria-hidden="true" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-semibold text-base tracking-tight text-slate-900 dark:text-slate-50">
                {booking.studio}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <User className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                <span className="font-medium">{booking.client}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 dark:border-slate-900 pt-3 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/50 px-2 py-1 rounded-md border border-slate-100/50 dark:border-slate-800/50">
              <Calendar className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
              <time dateTime={booking.date} className="font-medium text-xs tracking-wide">
                {formatDate(booking.date)}
              </time>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/50 px-2 py-1 rounded-md border border-slate-100/50 dark:border-slate-800/50">
              <Clock className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
              <span className="font-medium text-xs tracking-wide">
                {formatTime(booking.startTime)} – {formatTime(booking.endTime)}
              </span>
            </div>
          </div>

          {booking.notes && (
            <div className="flex items-start gap-2 rounded-lg bg-slate-50/80 border border-slate-100 dark:bg-slate-900/40 dark:border-slate-800/60 p-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <StickyNote
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400"
                aria-hidden="true"
              />
              <p className="text-xs">{booking.notes}</p>
            </div>
          )}
        </div>

        <div className="self-start sm:pl-2">
          <Badge 
            variant={statusVariant[booking.status]} 
            className="shadow-sm font-semibold tracking-wide px-2.5 py-0.5 text-xs rounded-full"
          >
            {booking.status}
          </Badge>
        </div>
      </div>
    </article>
  );
}