/** Preguntas frecuentes de fisioterapia (contenido de ejemplo, editable). */

export type FaqItem = { pregunta: string; respuesta: string };

export const faq: FaqItem[] = [
  {
    pregunta: "¿Necesito una orden médica para mi primera sesión?",
    respuesta:
      "No es imprescindible para agendar una evaluación inicial. Si tienes informes médicos, estudios de imagen o una orden de tu médico, tráelos: ayudan a diseñar un plan más preciso.",
  },
  {
    pregunta: "¿Qué incluye la evaluación inicial?",
    respuesta:
      "Una entrevista sobre tu historia y tus objetivos, una valoración física del movimiento y la zona afectada, y la propuesta de un plan de tratamiento individualizado con metas claras.",
  },
  {
    pregunta: "¿Atiendes a domicilio?",
    respuesta:
      "Sí. Puedes elegir consultorio o domicilio al agendar. La atención a domicilio está disponible en las zonas de cobertura; confírmame tu ubicación por WhatsApp para coordinar.",
  },
  {
    pregunta: "¿Cuántas sesiones voy a necesitar?",
    respuesta:
      "Depende de tu diagnóstico, tu objetivo y tu evolución. Tras la evaluación inicial te daré una estimación realista; el plan se ajusta según tu progreso.",
  },
  {
    pregunta: "¿Qué ropa debo usar para la sesión?",
    respuesta:
      "Ropa cómoda que permita moverte con libertad y dejar accesible la zona a tratar (por ejemplo, pantalón corto para una lesión de rodilla).",
  },
  {
    pregunta: "¿La fisioterapia duele?",
    respuesta:
      "El objetivo es aliviar, no lastimar. Algunas técnicas pueden generar molestia puntual, siempre dentro de un umbral tolerable y consensuado contigo.",
  },
  {
    pregunta: "¿Tratas lesiones deportivas y ayudas en el retorno al deporte?",
    respuesta:
      "Sí, es una de mis áreas principales. Trabajo la recuperación de la lesión y un retorno progresivo y seguro a tu actividad o rendimiento.",
  },
  {
    pregunta: "¿Cómo confirmo o reprogramo mi cita?",
    respuesta:
      "Al agendar recibes un resumen para confirmar por WhatsApp. Si necesitas reprogramar, escríbeme por ese mismo medio con la mayor antelación posible.",
  },
];
