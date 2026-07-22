import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { freeSlots, type AvailabilityRow } from "@/lib/availability";
import { supabaseConfigured } from "@/lib/data";

/**
 * Metadatos para pintar el calendario sin una petición por día:
 * qué días de la semana tienen horario activo y qué fechas están bloqueadas.
 */
export async function getAvailabilityMeta(): Promise<{
  activeWeekdays: number[];
  blockedDates: string[];
}> {
  if (!supabaseConfigured()) {
    // Fallback razonable si aún no hay Supabase: todos los días activos.
    return { activeWeekdays: [0, 1, 2, 3, 4, 5, 6], blockedDates: [] };
  }
  const supabase = createAdminClient();
  const [{ data: avail }, { data: blocked }] = await Promise.all([
    supabase.from("availability").select("weekday,activo").eq("activo", true),
    supabase.from("blocked_dates").select("fecha"),
  ]);

  const activeWeekdays = Array.from(
    new Set((avail ?? []).map((r) => r.weekday as number)),
  );
  const blockedDates = (blocked ?? []).map((r) => r.fecha as string);
  return { activeWeekdays, blockedDates };
}

/** Horas libres para una fecha concreta (YYYY-MM-DD). */
export async function getFreeSlotsForDate(isoDate: string): Promise<string[]> {
  if (!supabaseConfigured()) return [];
  const supabase = createAdminClient();

  const [{ data: avail }, { data: blocked }, { data: citas }] =
    await Promise.all([
      supabase
        .from("availability")
        .select("weekday,start_time,end_time,slot_min,activo")
        .eq("activo", true),
      supabase.from("blocked_dates").select("fecha"),
      supabase
        .from("appointments")
        .select("hora,estado")
        .eq("fecha", isoDate)
        .neq("estado", "cancelada"),
    ]);

  return freeSlots({
    isoDate,
    availability: (avail ?? []) as AvailabilityRow[],
    blockedDates: (blocked ?? []).map((r) => r.fecha as string),
    takenTimes: (citas ?? []).map((c) => c.hora as string),
  });
}
