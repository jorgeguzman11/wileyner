import { NextResponse } from "next/server";
import { testimonialSchema } from "@/lib/schemas";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/data";

export const dynamic = "force-dynamic";

/** POST /api/testimonials — crea un testimonio NO aprobado (pendiente de moderación). */
export async function POST(request: Request) {
  if (!supabaseConfigured()) {
    return NextResponse.json(
      { error: "Los testimonios no están configurados todavía." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }

  const parsed = testimonialSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }
  const data = parsed.data;

  const supabase = createAdminClient();
  const { error } = await supabase.from("testimonials").insert({
    nombre: data.nombre,
    tratamiento: data.tratamiento,
    texto: data.texto,
    calificacion: data.calificacion,
    aprobado: false, // siempre pendiente de moderación
  });

  if (error) {
    return NextResponse.json(
      { error: "No pudimos guardar tu testimonio. Intenta de nuevo." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
