"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Stars } from "@/components/ui/Stars";
import { Whatsapp, MapPin } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { AdminAppointment } from "@/lib/admin-data";
import type { Testimonial, EstadoCita } from "@/lib/types";

const estados: { value: EstadoCita; label: string }[] = [
  { value: "confirmada", label: "Confirmar" },
  { value: "atendida", label: "Atendida" },
  { value: "cancelada", label: "Cancelar" },
];

const badgeStyles: Record<EstadoCita, string> = {
  pendiente: "bg-amber-50 text-amber-700 ring-amber-200",
  confirmada: "bg-accent-50 text-accent-700 ring-accent-200",
  atendida: "bg-sand-100 text-ink-soft ring-sand-300",
  cancelada: "bg-red-50 text-red-600 ring-red-200",
};

export function AdminDashboard({
  today,
  week,
  pendingTestimonials,
}: {
  today: AdminAppointment[];
  week: AdminAppointment[];
  pendingTestimonials: Testimonial[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function changeEstado(id: string, estado: EstadoCita) {
    setBusy(id);
    try {
      await fetch("/api/admin/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, estado }),
      });
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  async function moderate(id: string, aprobado: boolean) {
    setBusy(id);
    try {
      await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, aprobado }),
      });
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">
            Panel de citas
          </h1>
          <p className="text-sm text-ink-muted">
            {format(new Date(), "EEEE d 'de' MMMM", { locale: es })}
          </p>
        </div>
        <button
          onClick={logout}
          className="rounded-full border border-sand-300 bg-white px-4 py-2 text-sm text-ink-soft transition-colors hover:border-accent-300 hover:text-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Cerrar sesión
        </button>
      </div>

      <Section title="Hoy" count={today.length}>
        {today.length === 0 ? (
          <Empty>No hay citas para hoy.</Empty>
        ) : (
          today.map((c) => (
            <AppointmentRow
              key={c.id}
              c={c}
              busy={busy === c.id}
              onChange={changeEstado}
            />
          ))
        )}
      </Section>

      <Section title="Próximos 7 días" count={week.length}>
        {week.length === 0 ? (
          <Empty>No hay citas esta semana.</Empty>
        ) : (
          week.map((c) => (
            <AppointmentRow
              key={c.id}
              c={c}
              busy={busy === c.id}
              onChange={changeEstado}
              showDate
            />
          ))
        )}
      </Section>

      <Section title="Testimonios por aprobar" count={pendingTestimonials.length}>
        {pendingTestimonials.length === 0 ? (
          <Empty>No hay testimonios pendientes.</Empty>
        ) : (
          pendingTestimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-xl border border-sand-200 bg-white p-5 shadow-soft"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">{t.nombre}</p>
                  <p className="text-sm text-ink-muted">{t.tratamiento}</p>
                </div>
                <Stars value={t.calificacion} />
              </div>
              <p className="mt-3 text-pretty leading-relaxed text-ink-soft">
                “{t.texto}”
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  disabled={busy === t.id}
                  onClick={() => moderate(t.id, true)}
                  className="rounded-full bg-accent-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50"
                >
                  Publicar
                </button>
                <button
                  disabled={busy === t.id}
                  onClick={() => moderate(t.id, false)}
                  className="rounded-full border border-sand-300 px-4 py-2 text-sm text-ink-soft transition-colors hover:border-red-300 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50"
                >
                  Mantener oculto
                </button>
              </div>
            </div>
          ))
        )}
      </Section>
    </div>
  );
}

function Section({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-medium text-ink">
        {title}
        <span className="rounded-full bg-sand-100 px-2 py-0.5 text-sm font-normal text-ink-muted">
          {count}
        </span>
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-sand-300 bg-white/60 px-4 py-6 text-center text-sm text-ink-muted">
      {children}
    </p>
  );
}

function AppointmentRow({
  c,
  busy,
  onChange,
  showDate,
}: {
  c: AdminAppointment;
  busy: boolean;
  onChange: (id: string, estado: EstadoCita) => void;
  showDate?: boolean;
}) {
  const waLink = `https://wa.me/${c.telefono.replace(/\D/g, "")}`;
  return (
    <div className="rounded-xl border border-sand-200 bg-white p-4 shadow-soft sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-ink">{c.nombre}</span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-medium capitalize ring-1",
                badgeStyles[c.estado],
              )}
            >
              {c.estado}
            </span>
          </div>
          <p className="mt-1 text-sm text-ink-soft">
            {showDate && (
              <span className="capitalize">
                {format(new Date(`${c.fecha}T00:00:00`), "EEE d MMM", { locale: es })}
                {" · "}
              </span>
            )}
            <span className="font-medium">{c.hora.slice(0, 5)}</span>
            {" · "}
            {c.servicio ?? "Servicio"}
            {" · "}
            {c.zona}
          </p>
          <p className="mt-1 flex items-start gap-1 text-sm text-ink-muted">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {c.direccion}
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-accent-600"
            >
              <Whatsapp className="h-3.5 w-3.5" />
              {c.telefono}
            </a>
          </p>
          {c.motivo && (
            <p className="mt-2 text-sm text-ink-soft">“{c.motivo}”</p>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {estados.map((e) => (
            <button
              key={e.value}
              disabled={busy || c.estado === e.value}
              onClick={() => onChange(c.id, e.value)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-40",
                e.value === "cancelada"
                  ? "border-sand-300 text-ink-soft hover:border-red-300 hover:text-red-600"
                  : "border-sand-300 text-ink-soft hover:border-accent-300 hover:text-accent-600",
              )}
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
