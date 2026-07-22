import { site, whatsappGreeting } from "./site-config";
import { services } from "@/content/services";

/** Normaliza un número a sólo dígitos para wa.me. */
function digits(phone: string) {
  return phone.replace(/\D/g, "");
}

/** Enlace genérico de WhatsApp para el CTA "Escribir por WhatsApp". */
export function whatsappLink(message = whatsappGreeting) {
  return `https://wa.me/${digits(site.whatsapp)}?text=${encodeURIComponent(message)}`;
}

export type AppointmentSummary = {
  nombre: string;
  telefono: string;
  servicio: string; // slug
  zona: string;
  direccion: string;
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:mm
};

/**
 * Enlace wa.me prellenado con el resumen de la cita, para que el
 * paciente confirme por WhatsApp tras enviar el formulario.
 */
export function whatsappAppointmentLink(a: AppointmentSummary) {
  const nombreServicio =
    services.find((s) => s.slug === a.servicio)?.nombre ?? a.servicio;
  const fechaLegible = formatDateEs(a.fecha);
  const msg =
    `Hola ${site.nombreCorto}, quiero confirmar mi cita a domicilio:\n\n` +
    `• Nombre: ${a.nombre}\n` +
    `• Servicio: ${nombreServicio}\n` +
    `• Zona: ${a.zona}\n` +
    `• Dirección: ${a.direccion}\n` +
    `• Fecha: ${fechaLegible}\n` +
    `• Hora: ${a.hora}\n` +
    `• Teléfono: ${a.telefono}`;
  return `https://wa.me/${digits(site.whatsapp)}?text=${encodeURIComponent(msg)}`;
}

/** Formatea "2026-07-25" → "sábado 25 de julio de 2026". */
export function formatDateEs(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat("es-VE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
