import { createBrowserClient } from "@supabase/ssr";

/** Cliente de Supabase para el navegador (clave anon, protegido por RLS). */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
