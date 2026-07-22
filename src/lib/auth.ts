import "server-only";
import { createHash } from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "admin_session";

/** Token de sesión derivado de la contraseña (no se guarda la clave en claro). */
export function expectedToken(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return createHash("sha256").update(pw).digest("hex");
}

/** ¿La petición actual viene de un administrador autenticado? */
export function isAuthed(): boolean {
  const token = expectedToken();
  if (!token) return false;
  return cookies().get(SESSION_COOKIE)?.value === token;
}

/** Compara la contraseña recibida con la configurada. */
export function passwordMatches(password: string): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  return Boolean(pw) && password === pw;
}
