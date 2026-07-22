import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Carrusel } from "@/components/testimonials/Carrusel";
import { getApprovedTestimonials } from "@/lib/data";
import { ArrowRight } from "@/components/ui/icons";

export async function Testimonios() {
  const testimonios = await getApprovedTestimonials();

  return (
    <section
      id="testimonios"
      className="section-pad scroll-mt-20 bg-accent-500/[0.04]"
    >
      <div className="container-content">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Testimonios"
            title="Lo que dicen mis pacientes"
            intro="Experiencias reales de personas que recuperaron su movilidad."
            id="testimonios-title"
          />
          <Reveal className="mb-12 hidden sm:block">
            <ButtonLink href="/testimonios/nuevo" variant="secondary">
              Dejar mi testimonio
            </ButtonLink>
          </Reveal>
        </div>

        {testimonios.length > 0 ? (
          <Reveal>
            <Carrusel testimonios={testimonios} />
          </Reveal>
        ) : (
          <Reveal>
            <div className="rounded-2xl border border-dashed border-sand-300 bg-white/60 p-10 text-center">
              <p className="text-lg text-ink-soft">
                Pronto publicaré aquí testimonios de mis pacientes.
              </p>
              <p className="mt-2 text-ink-muted">
                ¿Ya te atendí? Me encantaría conocer tu experiencia.
              </p>
              <ButtonLink
                href="/testimonios/nuevo"
                className="mt-6"
              >
                Dejar mi testimonio
                <ArrowRight className="h-5 w-5" />
              </ButtonLink>
            </div>
          </Reveal>
        )}

        <div className="mt-8 sm:hidden">
          <ButtonLink
            href="/testimonios/nuevo"
            variant="secondary"
            className="w-full"
          >
            Dejar mi testimonio
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
