/**
 * Lógica de disponibilidad de turnos.
 * Combina el horario laboral (availability), los días bloqueados
 * (blocked_dates) y las citas ya tomadas (appointments) para exponer
 * SÓLO las horas libres — sin filtrar datos personales de otras citas.
 */

export type AvailabilityRow = {
  weekday: number; // 0 = domingo ... 6 = sábado
  start_time: string; // "08:00:00"
  end_time: string; // "18:00:00"
  slot_min: number; // p.ej. 45
  activo: boolean;
};

/** "08:00:00" | "08:00" -> minutos desde medianoche. */
function toMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

/** minutos -> "HH:mm". */
function toHHmm(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Día de la semana (0-6) de una fecha ISO "YYYY-MM-DD", en UTC. */
export function weekdayOf(isoDate: string): number {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

/** Genera todos los turnos teóricos de un día según su horario. */
export function generateSlots(rows: AvailabilityRow[], weekday: number): string[] {
  const slots: string[] = [];
  for (const row of rows) {
    if (!row.activo || row.weekday !== weekday) continue;
    const start = toMinutes(row.start_time);
    const end = toMinutes(row.end_time);
    for (let t = start; t + row.slot_min <= end; t += row.slot_min) {
      slots.push(toHHmm(t));
    }
  }
  return Array.from(new Set(slots)).sort();
}

/**
 * Devuelve las horas libres para una fecha:
 * turnos del día − horas ocupadas por citas activas.
 * Las citas canceladas no bloquean el turno.
 */
export function freeSlots(params: {
  isoDate: string;
  availability: AvailabilityRow[];
  blockedDates: string[]; // ["2026-07-25", ...]
  takenTimes: string[]; // ["08:00", "09:30", ...] citas no canceladas
  now?: Date;
}): string[] {
  const { isoDate, availability, blockedDates, takenTimes } = params;

  // Día bloqueado (feriado / vacaciones) → sin turnos.
  if (blockedDates.includes(isoDate)) return [];

  const weekday = weekdayOf(isoDate);
  const all = generateSlots(availability, weekday);
  const taken = new Set(takenTimes.map((t) => t.slice(0, 5)));

  // Si la fecha es hoy, oculta horas ya pasadas.
  const now = params.now ?? new Date();
  const todayIso = now.toISOString().slice(0, 10);
  const nowMinutes =
    isoDate === todayIso ? now.getHours() * 60 + now.getMinutes() : -1;

  return all.filter((slot) => {
    if (taken.has(slot)) return false;
    if (nowMinutes >= 0 && toMinutes(slot) <= nowMinutes) return false;
    return true;
  });
}
