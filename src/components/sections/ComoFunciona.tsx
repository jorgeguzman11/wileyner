import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealStagger, RevealItem } from "@/components/motion/Reveal";

const pasos = [
  {
    n: "01",
    titulo: "Agendas tu cita",
    texto:
      "Eliges servicio, modalidad, fecha y hora en pocos pasos. Confirmas por WhatsApp con un mensaje ya preparado.",
  },
  {
    n: "02",
    titulo: "Evaluación inicial",
    texto:
      "Conversamos tu historia y objetivos, valoramos el movimiento y la zona afectada, y definimos metas claras.",
  },
  {
    n: "03",
    titulo: "Plan de tratamiento",
    texto:
      "Diseño un plan individualizado y te acompaño sesión a sesión hasta devolverte tu movilidad sin restricciones.",
  },
];

export function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="section-pad scroll-mt-20 bg-white"
    >
      <div className="container-content">
        <SectionHeading
          eyebrow="Cómo funciona"
          title="Tu recuperación en tres pasos"
          align="center"
          id="como-funciona-title"
        />

        <RevealStagger className="grid gap-8 sm:grid-cols-3">
          {pasos.map((p, i) => (
            <RevealItem key={p.n} className="relative text-center">
              {/* Línea conectora (decorativa) */}
              {i < pasos.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[calc(50%+2.5rem)] top-7 hidden h-px w-[calc(100%-5rem)] bg-gradient-to-r from-accent-200 to-transparent sm:block"
                />
              )}
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-50 font-display text-lg font-semibold text-accent-500 ring-1 ring-accent-100">
                {p.n}
              </span>
              <h3 className="mt-5 font-display text-xl font-medium text-ink">
                {p.titulo}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-pretty leading-relaxed text-ink-soft">
                {p.texto}
              </p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
