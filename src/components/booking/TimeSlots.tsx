"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/** Lista de horas libres para la fecha elegida (leídas de Supabase). */
export function TimeSlots({
  date,
  value,
  onChange,
}: {
  date: string | null;
  value: string | null;
  onChange: (hora: string) => void;
}) {
  const [slots, setSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!date) {
      setSlots([]);
      return;
    }
    let alive = true;
    setLoading(true);
    setError(false);
    fetch(`/api/availability?date=${date}`)
      .then((r) => r.json())
      .then((d: { slots?: string[] }) => {
        if (alive) setSlots(d.slots ?? []);
      })
      .catch(() => alive && setError(true))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [date]);

  if (!date) {
    return (
      <p className="rounded-xl bg-sand-100 px-4 py-6 text-center text-sm text-ink-muted">
        Primero elige una fecha en el calendario.
      </p>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-8 text-ink-muted">
        <Spinner className="h-5 w-5" />
        <span className="text-sm">Buscando horas disponibles…</span>
      </div>
    );
  }

  if (error) {
    return (
      <p role="alert" className="rounded-xl bg-red-50 px-4 py-6 text-center text-sm text-red-700">
        No pudimos cargar las horas. Intenta de nuevo.
      </p>
    );
  }

  if (slots.length === 0) {
    return (
      <p className="rounded-xl bg-sand-100 px-4 py-6 text-center text-sm text-ink-muted">
        No hay horas disponibles ese día. Prueba con otra fecha.
      </p>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Horas disponibles"
      className="grid grid-cols-3 gap-2 sm:grid-cols-4"
    >
      {slots.map((hora) => {
        const selected = value === hora;
        return (
          <button
            key={hora}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(hora)}
            className={cn(
              "rounded-xl border px-2 py-2.5 text-sm font-medium transition-[transform,background-color,border-color,color] duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.97] motion-reduce:active:scale-100",
              selected
                ? "border-accent-500 bg-accent-500 text-white"
                : "border-sand-300 bg-white text-ink hover:border-accent-300 hover:text-accent-600",
            )}
          >
            {hora}
          </button>
        );
      })}
    </div>
  );
}
