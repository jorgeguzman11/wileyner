import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/lib/types";

/** ¿Están configuradas las variables de Supabase? */
export function supabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/**
 * Testimonios aprobados (RLS ya filtra aprobado=true, pero lo pedimos
 * explícito). Si Supabase no está configurado, devuelve [] sin romper.
 */
export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  if (!supabaseConfigured()) return [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("aprobado", true)
      .order("created_at", { ascending: false });
    if (error) return [];
    return (data ?? []) as Testimonial[];
  } catch {
    return [];
  }
}
