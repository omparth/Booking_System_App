# Studio Bookings Dashboard

A clean, modern React + TypeScript dashboard for managing studio bookings. Built as a KonnectStudios take-home assignment.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Lucide React icons
- React Hook Form + Zod (Add Booking form)
- Sonner (toast notifications)

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run preview` | Preview production build |

## Project Structure

```
src/
  components/
    Header.tsx
    FilterBar.tsx
    BookingCard.tsx
    BookingList.tsx
    AddBookingDialog.tsx
    EmptyState.tsx
    ui/                  # shadcn-style primitives
  hooks/
    useBookings.ts
  data/
    bookings.json
  types/
    booking.ts
  lib/
    utils.ts
  App.tsx
```

## Features

- Load bookings from local JSON
- Search by studio or client
- Filter by status and studio
- Sort by date (newest / oldest)
- Add bookings with validated form
- Success toasts on new bookings
- Placeholder "Book with Calendly" button

Data is stored in React state only — no backend or persistence.
