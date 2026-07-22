import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { Clock } from "@/components/ui/icons";
import { services } from "@/content/services";

export function Servicios() {
  return (
    <section id="servicios" className="section-pad scroll-mt-20">
      <div className="container-content">
        <SectionHeading
          eyebrow="Servicios"
          title="Áreas de especialidad"
          intro="Un enfoque distinto para cada necesidad, siempre con un plan pensado para ti."
          id="servicios-title"
        />

        <RevealStagger
          as="ul"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => (
            <RevealItem
              key={s.slug}
              as="li"
              className="group flex flex-col rounded-2xl border border-sand-200 bg-white p-6 shadow-soft transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-lift motion-reduce:hover:translate-y-0"
            >
              <h3 className="font-display text-xl font-medium text-ink">
                {s.nombre}
              </h3>
              <p className="mt-2 flex-1 text-pretty leading-relaxed text-ink-soft">
                {s.descripcion}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-ink-muted">
                <Clock className="h-4 w-4 text-accent-400" />
                Sesión de {s.duracionMin} min aprox.
              </p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
