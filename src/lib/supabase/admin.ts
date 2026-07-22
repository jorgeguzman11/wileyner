import { createClient } from "@supabase/supabase-js";

/**
 * Cliente con service_role — SOLO para uso en el servidor (rutas API).
 * Omite RLS: úsalo únicamente en endpoints protegidos.
 * Nunca importes este módulo en código que llegue al cliente.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
