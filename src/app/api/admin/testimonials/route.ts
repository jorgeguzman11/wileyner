import { NextResponse } from "next/server";
import { z } from "zod";
import { isAuthed } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const patchSchema = z.object({
  id: z.string().uuid(),
  aprobado: z.boolean(),
});

/** PATCH /api/admin/testimonials — aprueba u oculta un testimonio (protegido). */
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
    .from("testimonials")
    .update({ aprobado: parsed.data.aprobado })
    .eq("id", parsed.data.id);

  if (error) {
    return NextResponse.json(
      { error: "No pudimos actualizar el testimonio." },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
