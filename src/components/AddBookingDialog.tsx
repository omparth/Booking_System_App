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
      <DialogContent className="sm:max-w-[520px] p-0 border border-slate-200/50 dark:border-slate-800/60 bg-white dark:bg-[#0c0e12] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col max-h-[92vh] rounded-2xl">
        {/* Top Accent Premium Line */}
        <div className="h-[4px] w-full bg-gradient-to-r from-slate-900 via-slate-600 to-slate-400 dark:from-slate-800 dark:via-slate-500 dark:to-slate-700 shrink-0" />
        
        <div className="overflow-y-auto p-6 sm:p-7 space-y-6 flex-1 custom-scrollbar">
          {/* Header section */}
          <DialogHeader className="space-y-1.5 text-left pb-4 border-b border-slate-100 dark:border-slate-900/60">
            <DialogTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Create Booking Slot
            </DialogTitle>
            <DialogDescription className="text-xs font-medium text-slate-400 dark:text-slate-500">
              Set up a new studio timeline slot. Required properties are marked with <span className="text-rose-500 font-semibold">*</span>.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-4 pt-2"
            noValidate
          >
            {/* Input grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="studio" className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                  Studio Space <span className="text-rose-500 font-bold">*</span>
                </Label>
                <Input
                  id="studio"
                  placeholder="e.g. Studio A"
                  className={cn(
                    "h-9 text-xs bg-slate-50/40 border-slate-200/60 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white dark:bg-slate-950/40 dark:border-slate-800/60 dark:text-white dark:focus-visible:bg-slate-950 transition-all duration-200 rounded-xl focus-visible:ring-1 focus-visible:ring-slate-400/60 dark:focus-visible:ring-slate-700/60 focus-visible:border-transparent shadow-none",
                    errors.studio && "border-rose-500/40 focus-visible:ring-rose-500/10 dark:border-rose-500/40"
                  )}
                  aria-invalid={!!errors.studio}
                  {...register("studio")}
                />
                {errors.studio && (
                  <p className="text-[11px] font-medium text-rose-500 mt-1 animate-in fade-in slide-in-from-top-1" role="alert">
                    {errors.studio.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="client" className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                  Client Name <span className="text-rose-500 font-bold">*</span>
                </Label>
                <Input
                  id="client"
                  placeholder="e.g. Acme Corp"
                  className={cn(
                    "h-9 text-xs bg-slate-50/40 border-slate-200/60 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:bg-white dark:bg-slate-950/40 dark:border-slate-800/60 dark:focus-visible:bg-slate-950 transition-all duration-200 rounded-xl focus-visible:ring-1 focus-visible:ring-slate-400/60 dark:focus-visible:ring-slate-700/60 focus-visible:border-transparent shadow-none",
                    errors.client && "border-rose-500/40 focus-visible:ring-rose-500/10 dark:border-rose-500/40"
                  )}
                  aria-invalid={!!errors.client}
                  {...register("client")}
                />
                {errors.client && (
                  <p className="text-[11px] font-medium text-rose-500 mt-1 animate-in fade-in slide-in-from-top-1" role="alert">
                    {errors.client.message}
                  </p>
                )}
              </div>
            </div>

            {/* Date & Time Row */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="date" className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                  Target Date <span className="text-rose-500 font-bold">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  className={cn(
                    "h-9 text-xs bg-slate-50/40 border-slate-200/60 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:bg-white dark:bg-slate-950/40 dark:border-slate-800/60 dark:focus-visible:bg-slate-950 transition-all duration-200 rounded-xl focus-visible:ring-1 focus-visible:ring-slate-400/60 dark:focus-visible:ring-slate-700/60 focus-visible:border-transparent shadow-none",
                    errors.date && "border-rose-500/40 focus-visible:ring-rose-500/10 dark:border-rose-500/40"
                  )}
                  aria-invalid={!!errors.date}
                  {...register("date")}
                />
                {errors.date && (
                  <p className="text-[11px] font-medium text-rose-500 mt-1 animate-in fade-in slide-in-from-top-1" role="alert">
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="startTime" className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                  Start Time <span className="text-rose-500 font-bold">*</span>
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  className={cn(
                    "h-9 text-xs bg-slate-50/40 border-slate-200/60 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:bg-white dark:bg-slate-950/40 dark:border-slate-800/60 dark:focus-visible:bg-slate-950 transition-all duration-200 rounded-xl focus-visible:ring-1 focus-visible:ring-slate-400/60 dark:focus-visible:ring-slate-700/60 focus-visible:border-transparent shadow-none",
                    errors.startTime && "border-rose-500/40 focus-visible:ring-rose-500/10 dark:border-rose-500/40"
                  )}
                  aria-invalid={!!errors.startTime}
                  {...register("startTime")}
                />
                {errors.startTime && (
                  <p className="text-[11px] font-medium text-rose-500 mt-1 animate-in fade-in slide-in-from-top-1" role="alert">
                    {errors.startTime.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="endTime" className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                  End Time <span className="text-rose-500 font-bold">*</span>
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  className={cn(
                    "h-9 text-xs bg-slate-50/40 border-slate-200/60 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:bg-white dark:bg-slate-950/40 dark:border-slate-800/60 dark:focus-visible:bg-slate-950 transition-all duration-200 rounded-xl focus-visible:ring-1 focus-visible:ring-slate-400/60 dark:focus-visible:ring-slate-700/60 focus-visible:border-transparent shadow-none",
                    errors.endTime && "border-rose-500/40 focus-visible:ring-rose-500/10 dark:border-rose-500/40"
                  )}
                  aria-invalid={!!errors.endTime}
                  {...register("endTime")}
                />
                {errors.endTime && (
                  <p className="text-[11px] font-medium text-rose-500 mt-1 animate-in fade-in slide-in-from-top-1" role="alert">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>

            {/* Custom Premium Dropdown */}
            <div className="space-y-1.5">
              <Label htmlFor="status" className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
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
                  className="h-9 text-xs bg-slate-50/40 border-slate-200/60 text-slate-700 dark:bg-slate-950/40 dark:border-slate-800/60 dark:text-slate-300 focus:bg-white dark:focus:bg-slate-950 transition-all duration-200 rounded-xl focus:ring-1 focus:ring-slate-400/60 dark:focus:ring-slate-700/60 font-medium"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-xl z-[60] p-1 overflow-hidden">
                  <SelectItem value="Confirmed" className="text-xs font-medium cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800 rounded-lg py-2 pl-8 relative transition-colors focus:text-slate-900 dark:focus:text-slate-50 data-[state=checked]:bg-slate-50 dark:data-[state=checked]:bg-slate-800/50">Confirmed</SelectItem>
                  <SelectItem value="Pending" className="text-xs font-medium cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800 rounded-lg py-2 pl-8 relative transition-colors focus:text-slate-900 dark:focus:text-slate-50 data-[state=checked]:bg-slate-50 dark:data-[state=checked]:bg-slate-800/50">Pending</SelectItem>
                  <SelectItem value="Cancelled" className="text-xs font-medium cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800 rounded-lg py-2 pl-8 relative transition-colors focus:text-slate-900 dark:focus:text-slate-50 data-[state=checked]:bg-slate-50 dark:data-[state=checked]:bg-slate-800/50">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes Section */}
            <div className="space-y-1.5">
              <Label htmlFor="notes" className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">Optional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any technical context or specific setup requests..."
                rows={3}
                className="resize-none text-xs bg-slate-50/40 border-slate-200/60 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white dark:bg-slate-950/40 dark:border-slate-800/60 dark:text-white dark:focus-visible:bg-slate-950 transition-all duration-200 rounded-xl focus-visible:ring-1 focus-visible:ring-slate-400/60 dark:focus-visible:ring-slate-700/60 focus-visible:border-transparent shadow-none"
                {...register("notes")}
              />
            </div>

            {/* Premium Buttons Footer */}
            <DialogFooter className="pt-4 gap-2 sm:gap-0 border-t border-slate-100 dark:border-slate-900/60 mt-5 flex sm:flex-row items-center justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="w-full sm:w-auto text-xs font-semibold h-9 px-4 border-slate-200 dark:border-slate-800/80 dark:text-slate-300 transition-all duration-200 active:scale-[0.98] rounded-xl bg-transparent"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!isValid}
                className="w-full sm:w-auto text-xs font-semibold h-9 px-4 sm:ml-2 bg-gradient-to-b from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white dark:from-slate-50 dark:to-slate-100 dark:text-slate-900 dark:hover:from-white dark:hover:to-slate-200 shadow-none transition-all duration-200 active:scale-[0.98] disabled:opacity-40 rounded-xl border-none"
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