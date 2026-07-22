import Image from "next/image";
import { Stars } from "@/components/ui/Stars";
import type { Testimonial } from "@/lib/types";

export function TestimonialCard({ t }: { t: Testimonial }) {
  const iniciales = t.nombre
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-sand-200 bg-white p-6 shadow-soft sm:p-8">
      <Stars value={t.calificacion} className="mb-4" />
      <blockquote className="flex-1">
        <p className="text-pretty text-lg leading-relaxed text-ink">
          “{t.texto}”
        </p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-sand-100 pt-5">
        {t.foto_url ? (
          <Image
            src={t.foto_url}
            alt={t.nombre}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-50 font-display text-sm font-semibold text-accent-500"
          >
            {iniciales}
          </span>
        )}
        <div>
          <p className="font-medium text-ink">{t.nombre}</p>
          <p className="text-sm text-ink-muted">{t.tratamiento}</p>
        </div>
      </figcaption>
    </figure>
  );
}
