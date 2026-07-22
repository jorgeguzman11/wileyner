import { NextResponse } from "next/server";
import { z } from "zod";
import { isAuthed } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const patchSchema = z.object({
  id: z.string().uuid(),
  estado: z.enum(["pendiente", "confirmada", "atendida", "cancelada"]),
});

/** PATCH /api/admin/appointments — cambia el estado de una cita (protegido). */
export async function PATCH(request: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const parsed = patchSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 422 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("appointments")
    .update({ estado: parsed.data.estado })
    .eq("id", parsed.data.id);

  if (error) {
    return NextResponse.json(
      { error: "No pudimos actualizar la cita." },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
