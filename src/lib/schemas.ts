import { z } from "zod";
import { services } from "@/content/services";
import { site } from "@/lib/site-config";

const serviceSlugs = services.map((s) => s.slug) as [string, ...string[]];
const zonaValues = site.zonas as unknown as [string, ...string[]];

/** Validación de una cita — mensajes en español, claros para el paciente. */
export const appointmentSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre completo.")
    .max(80, "El nombre es demasiado largo."),
  telefono: z
    .string()
    .trim()
    .min(7, "Escribe un número de teléfono válido.")
    .max(20, "El teléfono es demasiado largo.")
    .regex(/^[+()\d\s-]+$/, "El teléfono sólo puede tener números y +()- ."),
  email: z
    .string()
    .trim()
    .email("Escribe un correo válido, por ejemplo nombre@correo.com."),
  servicio: z.enum(serviceSlugs, {
    errorMap: () => ({ message: "Elige el motivo de tu consulta." }),
  }),
  zona: z.enum(zonaValues, {
    errorMap: () => ({ message: "Elige tu zona de atención." }),
  }),
  direccion: z
    .string()
    .trim()
    .min(5, "Escribe la dirección donde te atenderé.")
    .max(200, "La dirección es demasiado larga."),
  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Elige una fecha en el calendario."),
  hora: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Elige una hora disponible."),
  motivo: z
    .string()
    .trim()
    .max(500, "El mensaje es demasiado largo.")
    .optional()
    .or(z.literal("")),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

/** Validación de un testimonio público. Entra siempre como no aprobado. */
export const testimonialSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre.")
    .max(80, "El nombre es demasiado largo."),
  tratamiento: z
    .string()
    .trim()
    .min(2, "Cuéntanos qué tratamiento recibiste.")
    .max(120, "Resume el tratamiento en menos palabras."),
  texto: z
    .string()
    .trim()
    .min(10, "Escribe unas líneas sobre tu experiencia.")
    .max(600, "El testimonio es demasiado largo."),
  calificacion: z
    .number({ invalid_type_error: "Elige una calificación." })
    .int()
    .min(1, "Elige una calificación.")
    .max(5),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
