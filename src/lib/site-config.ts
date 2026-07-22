/**
 * Configuración central del negocio.
 * Datos reales del profesional + PLACEHOLDERS claramente marcados.
 * Revisa los comentarios "PLACEHOLDER" antes de publicar.
 */

export const site = {
  // --- Identidad ---
  nombreCompleto: "Wileyner Alexander Rangel Rodríguez",
  nombreCorto: "Wileyner Rangel",
  profesion: "Fisioterapeuta",
  titulo: "Licenciado en Fisioterapia",

  // Frase de propuesta de valor (Hero)
  propuestaValor:
    "Recupera tu movilidad sin restricciones con un plan de tratamiento hecho a tu medida.",
  subtitulo:
    "Fisioterapia a domicilio: deportiva, traumatológica, geriátrica, neurológica y estimulación temprana. Voy hasta donde estés.",

  // --- Zonas de atención (atención 100% a domicilio) ---
  ciudadPrincipal: "Caracas",
  zonas: ["Caracas", "Guarenas", "Guatire", "Los Teques"],

  // --- Contacto ---
  whatsapp: "+584241759275", // se usa para el enlace wa.me
  whatsappDisplay: "+58 424 175 9275",
  // PLACEHOLDER: confirmar handle exacto (se asumió sin espacios).
  instagram: "wileynerrangel",
  instagramUrl: "https://instagram.com/wileynerrangel",
  // PLACEHOLDER: correo de contacto del profesional.
  email: "contacto@wileynerrangel.com",

  // --- Horario ---
  // PLACEHOLDER: el profesional indicó "todos los días". Se asumen horas
  // concretas para poder generar los turnos del calendario. Ajusta en
  // supabase/schema.sql (tabla availability) y este texto visible.
  horarioTexto: "Todos los días, 8:00 a.m. – 6:00 p.m.",

  // --- Sobre mí ---
  aniosExperiencia: 2,
  bio: "Me llamo Wileyner Rangel, soy Licenciado en Fisioterapia con dos años de experiencia en el área deportiva junto a la Fundación TeamCrossover. Mi trabajo consiste en crear un plan individualizado para lograr los mejores resultados y devolverte tu movilidad sin ninguna restricción.",
  credenciales: [
    "Licenciado en Fisioterapia",
    "2 años de experiencia en fisioterapia deportiva",
    "Fundación TeamCrossover",
  ],
} as const;

// Zonas de cobertura como tupla para validación (zod).
export const zonas = site.zonas as readonly string[];

// Mensaje base de WhatsApp para el CTA secundario del Hero.
export const whatsappGreeting =
  "Hola Wileyner, me gustaría más información sobre tus servicios de fisioterapia.";
