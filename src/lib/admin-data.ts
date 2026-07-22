import "server-only";
import { format, startOfToday, addDays } from "date-fns";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/data";
import type { Appointment, Testimonial } from "@/lib/types";

export type AdminAppointment = Appointment & { servicio: string | null };

/** Citas de hoy y de los próximos 7 días + testimonios pendientes. */
export async function getAdminData(): Promise<{
  today: AdminAppointment[];
  week: AdminAppointment[];
  pendingTestimonials: Testimonial[];
  configured: boolean;
}> {
  if (!supabaseConfigured()) {
    return { today: [], week: [], pendingTestimonials: [], configured: false };
  }

  const supabase = createAdminClient();
  const todayIso = format(startOfToday(), "yyyy-MM-dd");
  const weekEndIso = format(addDays(startOfToday(), 7), "yyyy-MM-dd");

  const [{ data: citas }, { data: pend }] = await Promise.all([
    supabase
      .from("appointments")
      .select("*, services(nombre)")
      .gte("fecha", todayIso)
      .lte("fecha", weekEndIso)
      .order("fecha", { ascending: true })
      .order("hora", { ascending: true }),
    supabase
      .from("testimonials")
      .select("*")
      .eq("aprobado", false)
      .order("created_at", { ascending: false }),
  ]);

  const rows: AdminAppointment[] = (citas ?? []).map((c: any) => ({
    ...c,
    servicio: c.services?.nombre ?? null,
  }));

  return {
    today: rows.filter((r) => r.fecha === todayIso),
    week: rows.filter((r) => r.fecha !== todayIso),
    pendingTestimonials: (pend ?? []) as Testimonial[],
    configured: true,
  };
}
