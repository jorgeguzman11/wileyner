import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking/BookingForm";
import { ChevronLeft } from "@/components/ui/icons";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Agendar cita",
  description: `Agenda tu cita de fisioterapia a domicilio con ${site.nombreCorto} en ${site.ciudadPrincipal}. Elige servicio, zona, fecha y hora.`,
  alternates: { canonical: "/agendar" },
};

export default function AgendarPage() {
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

      <main className="container-content max-w-3xl py-12 sm:py-16">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent-500">
            Agendar cita
          </p>
          <h1 className="text-display-md text-ink">
            Reserva tu sesión en unos minutos
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-soft">
            Completa tus datos y elige el día y la hora que mejor te queden. Al
            final podrás confirmar por WhatsApp.
          </p>
        </div>

        <BookingForm />
      </main>
    </div>
  );
}
