/**
 * Servicios / especialidades.
 * Fallback estático que refleja la tabla `services` de Supabase.
 * El slug coincide con el usado en el select del formulario de agendar.
 */

export type Service = {
  slug: string;
  nombre: string;
  descripcion: string;
  duracionMin: number;
};

export const services: Service[] = [
  {
    slug: "deportiva",
    nombre: "Fisioterapia deportiva",
    descripcion:
      "Recuperación de lesiones, prevención y retorno seguro a la actividad física y al rendimiento.",
    duracionMin: 45,
  },
  {
    slug: "traumatologica",
    nombre: "Fisioterapia traumatológica",
    descripcion:
      "Rehabilitación tras fracturas, esguinces, cirugías y lesiones musculoesqueléticas.",
    duracionMin: 45,
  },
  {
    slug: "geriatrica",
    nombre: "Fisioterapia geriátrica",
    descripcion:
      "Movilidad, equilibrio y autonomía para el adulto mayor, con un trato cercano y paciente.",
    duracionMin: 45,
  },
  {
    slug: "neurologica",
    nombre: "Fisioterapia neurológica",
    descripcion:
      "Reeducación del movimiento y la funcionalidad en condiciones de origen neurológico.",
    duracionMin: 60,
  },
  {
    slug: "estimulacion-temprana",
    nombre: "Estimulación temprana",
    descripcion:
      "Acompañamiento del desarrollo motor infantil mediante ejercicios y juego guiado.",
    duracionMin: 45,
  },
];
