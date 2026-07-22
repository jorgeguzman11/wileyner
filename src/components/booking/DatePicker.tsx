"use client";

import { useEffect, useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type Meta = { activeWeekdays: number[]; blockedDates: string[] };

/** Calendario accesible que bloquea días no laborables y pasados. */
export function DatePicker({
  value,
  onChange,
}: {
  value: string | null; // YYYY-MM-DD
  onChange: (iso: string) => void;
}) {
  const today = startOfToday();
  const [cursor, setCursor] = useState(startOfMonth(today));
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch("/api/availability?meta=1")
      .then((r) => r.json())
      .then((d: Meta) => {
        if (alive) setMeta(d);
      })
      .catch(() => {
        if (alive) setMeta({ activeWeekdays: [0, 1, 2, 3, 4, 5, 6], blockedDates: [] });
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [cursor]);

  const isDisabled = (d: Date) => {
    if (isBefore(d, today)) return true;
    if (!meta) return true;
    if (!meta.activeWeekdays.includes(d.getDay())) return true;
    if (meta.blockedDates.includes(format(d, "yyyy-MM-dd"))) return true;
    return false;
  };

  const canGoPrev = !isSameMonth(cursor, today);

  return (
    <div className="rounded-2xl border border-sand-200 bg-white p-4 shadow-soft sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => canGoPrev && setCursor(addMonths(cursor, -1))}
          disabled={!canGoPrev}
          aria-label="Mes anterior"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand-100 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-30"
        >
          <ChevronLeft />
        </button>
        <p className="font-display text-base font-medium capitalize text-ink" aria-live="polite">
          {format(cursor, "MMMM yyyy", { locale: es })}
        </p>
        <button
          type="button"
          onClick={() => setCursor(addMonths(cursor, 1))}
          aria-label="Mes siguiente"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand-100 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-ink-muted">
        {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => (
          <span key={i} aria-hidden>
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1" role="grid" aria-label="Elegir fecha">
        {days.map((d) => {
          const iso = format(d, "yyyy-MM-dd");
          const disabled = isDisabled(d);
          const selected = value === iso;
          const outside = !isSameMonth(d, cursor);
          return (
            <button
              key={iso}
              type="button"
              role="gridcell"
              aria-selected={selected}
              aria-label={format(d, "d 'de' MMMM yyyy", { locale: es })}
              disabled={disabled || loading}
              onClick={() => onChange(iso)}
              className={cn(
                "flex h-10 items-center justify-center rounded-lg text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-1",
                outside && "text-ink-muted/40",
                !disabled && !selected && "text-ink hover:bg-accent-50",
                selected && "bg-accent-500 font-medium text-white hover:bg-accent-500",
                disabled && "cursor-not-allowed text-ink-muted/30 line-through",
              )}
            >
              {format(d, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
