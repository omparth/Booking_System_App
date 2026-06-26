//src/components/AddBookingDialog.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Booking, BookingStatus } from "@/types/booking";

const bookingFormSchema = z
  .object({
    studio: z.string().trim().min(1, "Studio is required"),
    client: z.string().trim().min(1, "Client name is required"),
    date: z.string().min(1, "Date is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    status: z.enum(["Confirmed", "Pending", "Cancelled"]),
    notes: z.string().optional(),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "End time must be after start time",
    path: ["endTime"],
  });

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface AddBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (booking: Booking) => void;
}

const defaultValues: BookingFormValues = {
  studio: "",
  client: "",
  date: "",
  startTime: "",
  endTime: "",
  status: "Pending",
  notes: "",
};

export function AddBookingDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddBookingDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const status = watch("status");

  const handleFormSubmit = (values: BookingFormValues) => {
    const booking: Booking = {
      id: crypto.randomUUID(),
      studio: values.studio,
      client: values.client,
      date: values.date,
      startTime: values.startTime,
      endTime: values.endTime,
      status: values.status,
      notes: values.notes?.trim() || undefined,
    };

    onSubmit(booking);
    reset(defaultValues);
    onOpenChange(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset(defaultValues);
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[540px] p-0 border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-primary to-emerald-400 shrink-0" />
        
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 custom-scrollbar flex-1">
          <DialogHeader className="space-y-1.5 text-left pb-4 border-b border-slate-100 dark:border-slate-900">
            <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Create Booking
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
              Set up a new studio timeline slot. Required properties are marked with <span className="text-rose-500 font-semibold">*</span>.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-5"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="studio" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Studio Space <span className="text-rose-500 font-bold">*</span>
                </Label>
                <Input
                  id="studio"
                  placeholder="e.g. Studio A"
                  className={cn(
                    "bg-slate-50/50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white dark:bg-slate-900/40 dark:border-slate-800 dark:text-white dark:focus-visible:bg-slate-900 transition-all duration-200",
                    errors.studio && "border-rose-500/50 focus-visible:ring-rose-500/10 dark:border-rose-500/50"
                  )}
                  aria-invalid={!!errors.studio}
                  {...register("studio")}
                />
                {errors.studio && (
                  <p className="text-xs font-medium text-rose-500 mt-1 animate-in fade-in slide-in-from-top-1" role="alert">
                    {errors.studio.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="client" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Client Name <span className="text-rose-500 font-bold">*</span>
                </Label>
                <Input
                  id="client"
                  placeholder="e.g. Acme Corp"
                  className={cn(
                    "bg-slate-50/50 border-slate-200 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:bg-white dark:bg-slate-900/40 dark:border-slate-800 dark:focus-visible:bg-slate-900 transition-all duration-200",
                    errors.client && "border-rose-500/50 focus-visible:ring-rose-500/10 dark:border-rose-500/50"
                  )}
                  aria-invalid={!!errors.client}
                  {...register("client")}
                />
                {errors.client && (
                  <p className="text-xs font-medium text-rose-500 mt-1 animate-in fade-in slide-in-from-top-1" role="alert">
                    {errors.client.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-5 grid-cols-1 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Target Date <span className="text-rose-500 font-bold">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  className={cn(
                    "bg-slate-50/50 border-slate-200 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:bg-white dark:bg-slate-900/40 dark:border-slate-800 dark:focus-visible:bg-slate-900 transition-all duration-200",
                    errors.date && "border-rose-500/50 focus-visible:ring-rose-500/10 dark:border-rose-500/50"
                  )}
                  aria-invalid={!!errors.date}
                  {...register("date")}
                />
                {errors.date && (
                  <p className="text-xs font-medium text-rose-500 mt-1 animate-in fade-in slide-in-from-top-1" role="alert">
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Start Time <span className="text-rose-500 font-bold">*</span>
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  className={cn(
                    "bg-slate-50/50 border-slate-200 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:bg-white dark:bg-slate-900/40 dark:border-slate-800 dark:focus-visible:bg-slate-900 transition-all duration-200",
                    errors.startTime && "border-rose-500/50 focus-visible:ring-rose-500/10 dark:border-rose-500/50"
                  )}
                  aria-invalid={!!errors.startTime}
                  {...register("startTime")}
                />
                {errors.startTime && (
                  <p className="text-xs font-medium text-rose-500 mt-1 animate-in fade-in slide-in-from-top-1" role="alert">
                    {errors.startTime.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  End Time <span className="text-rose-500 font-bold">*</span>
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  className={cn(
                    "bg-slate-50/50 border-slate-200 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:bg-white dark:bg-slate-900/40 dark:border-slate-800 dark:focus-visible:bg-slate-900 transition-all duration-200",
                    errors.endTime && "border-rose-500/50 focus-visible:ring-rose-500/10 dark:border-rose-500/50"
                  )}
                  aria-invalid={!!errors.endTime}
                  {...register("endTime")}
                />
                {errors.endTime && (
                  <p className="text-xs font-medium text-rose-500 mt-1 animate-in fade-in slide-in-from-top-1" role="alert">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Initial Status <span className="text-rose-500 font-bold">*</span>
              </Label>
              <Select
                value={status}
                onValueChange={(value) =>
                  setValue("status", value as BookingStatus, {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger 
                  id="status" 
                  className="bg-slate-50/50 border-slate-200 text-slate-900 dark:bg-slate-900/40 dark:border-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 transition-all duration-200"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 border border-slate-200/80 dark:border-slate-800/80 shadow-xl">
                  <SelectItem value="Confirmed" className="text-sm cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-900 focus:text-slate-900 dark:focus:text-slate-50">Confirmed</SelectItem>
                  <SelectItem value="Pending" className="text-sm cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-900 focus:text-slate-900 dark:focus:text-slate-50">Pending</SelectItem>
                  <SelectItem value="Cancelled" className="text-sm cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-900 focus:text-slate-900 dark:focus:text-slate-50">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Optional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any technical context, hardware setup, or rider requests..."
                rows={3}
                className="resize-none bg-slate-50/50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white dark:bg-slate-900/40 dark:border-slate-800 dark:text-white dark:focus-visible:bg-slate-900 transition-all duration-200"
                {...register("notes")}
              />
            </div>

            <DialogFooter className="pt-4 gap-2 sm:gap-2 border-t border-slate-100 dark:border-slate-900 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="w-full sm:w-auto font-medium border-slate-200 dark:border-slate-800 dark:text-slate-300 transition-all duration-200 active:scale-98"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!isValid}
                className="w-full sm:w-auto font-medium shadow-[0_2px_4px_rgba(0,0,0,0.05)] transition-all duration-200 active:scale-98 disabled:opacity-50"
              >
                Add Booking
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function cn(...inputs: any[]) {
  return inputs
    .flat(Infinity)
    .filter((input) => input && (typeof input === "string" || typeof input === "object"))
    .map((input) => {
      if (typeof input === "object") {
        return Object.entries(input)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(" ");
      }
      return input;
    })
    .filter(Boolean)
    .join(" ");
}