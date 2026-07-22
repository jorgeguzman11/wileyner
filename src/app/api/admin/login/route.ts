import { NextResponse } from "next/server";
import { SESSION_COOKIE, expectedToken, passwordMatches } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** POST /api/admin/login — inicia sesión con la contraseña única. */
export async function POST(request: Request) {
  const token = expectedToken();
  if (!token) {
    return NextResponse.json(
      { error: "El panel no está configurado (falta ADMIN_PASSWORD)." },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }

  if (!body.password || !passwordMatches(body.password)) {
    return NextResponse.json({ error: "Contraseña incorrecta." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 horas
  });
  return res;
}

/** DELETE /api/admin/login — cierra sesión. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
