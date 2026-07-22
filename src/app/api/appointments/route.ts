import { NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/schemas";
import { createAdminClient } from "@/lib/supabase/admin";
import { getFreeSlotsForDate } from "@/lib/availability-server";
import { supabaseConfigured } from "@/lib/data";

export const dynamic = "force-dynamic";

/** POST /api/appointments — crea una cita en estado "pendiente". */
export async function POST(request: Request) {
  if (!supabaseConfigured()) {
    return NextResponse.json(
      { error: "El sistema de citas no está configurado todavía." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }

  const parsed = appointmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }
  const data = parsed.data;

  const supabase = createAdminClient();

  // Verifica que la hora siga libre (evita condición de carrera).
  const libres = await getFreeSlotsForDate(data.fecha);
  if (!libres.includes(data.hora)) {
    return NextResponse.json(
      { error: "Esa hora ya no está disponible. Elige otra, por favor." },
      { status: 409 },
    );
  }

  // Resuelve el service_id a partir del slug.
  const { data: servicio } = await supabase
    .from("services")
    .select("id")
    .eq("slug", data.servicio)
    .maybeSingle();

  const { data: inserted, error } = await supabase
    .from("appointments")
    .insert({
      nombre: data.nombre,
      telefono: data.telefono,
      email: data.email,
      service_id: servicio?.id ?? null,
      modalidad: data.modalidad,
      fecha: data.fecha,
      hora: data.hora,
      motivo: data.motivo || null,
      estado: "pendiente",
    })
    .select("id")
    .single();

  if (error) {
    // 23505 = violación de índice único (turno tomado entre la comprobación y el insert)
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Esa hora acaba de ocuparse. Elige otra, por favor." },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "No pudimos guardar la cita. Intenta de nuevo." },
      { status: 500 },
    );
  }

  return NextResponse.json({ id: inserted.id }, { status: 201 });
}
