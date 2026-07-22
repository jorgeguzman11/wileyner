import type { Metadata } from "next";
import Link from "next/link";
import { TestimonialForm } from "@/components/testimonials/TestimonialForm";
import { ChevronLeft } from "@/components/ui/icons";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Deja tu testimonio",
  description: `Comparte tu experiencia con ${site.nombreCorto}, fisioterapeuta en ${site.ciudadPrincipal}.`,
  alternates: { canonical: "/testimonios/nuevo" },
  robots: { index: false, follow: true },
};

export default function NuevoTestimonioPage() {
  return (
    <div className="min-h-dvh bg-sand-50">
      <header className="border-b border-sand-200 bg-sand-50/85 backdrop-blur-md">
        <div className="container-content flex h-16 items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-accent-600"
          >
            <ChevronLeft className="h-4 w-4" />
            Volver
          </Link>
          <span className="font-display font-semibold text-ink">
            {site.nombreCorto}
          </span>
        </div>
      </header>

      <main className="container-content max-w-xl py-12 sm:py-16">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent-500">
            Testimonios
          </p>
          <h1 className="text-display-md text-ink">Comparte tu experiencia</h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-soft">
            Tu testimonio ayuda a otras personas a dar el primer paso. Se
            revisará antes de publicarse.
          </p>
        </div>

        <TestimonialForm />
      </main>
    </div>
  );
}
