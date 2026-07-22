import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Check } from "@/components/ui/icons";
import { site } from "@/lib/site-config";

export function SobreMi() {
  return (
    <section id="sobre-mi" className="section-pad scroll-mt-20">
      <div className="container-content grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent-500">
            Sobre mí
          </p>
          <h2 className="text-display-md text-ink">
            {site.nombreCorto}, {site.profesion}
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-soft">
            {site.bio}
          </p>

          <ul className="mt-8 space-y-3">
            {site.credenciales.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-500">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-ink-soft">{c}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={0.1}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-accent-50 shadow-lift ring-1 ring-sand-200 lg:ml-auto">
            {/* PLACEHOLDER: foto secundaria o de consultorio */}
            <Image
              src="/profesional.svg"
              alt={`${site.nombreCompleto} en consulta`}
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
