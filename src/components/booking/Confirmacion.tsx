"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Whatsapp } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/content/services";
import { whatsappAppointmentLink, formatDateEs } from "@/lib/whatsapp";
import type { AppointmentInput } from "@/lib/schemas";

export function Confirmacion({ cita }: { cita: AppointmentInput }) {
  const reduce = useReducedMotion();
  const nombreServicio =
    services.find((s) => s.slug === cita.servicio)?.nombre ?? cita.servicio;

  const waLink = whatsappAppointmentLink({
    nombre: cita.nombre,
    telefono: cita.telefono,
    servicio: cita.servicio,
    zona: cita.zona,
    direccion: cita.direccion,
    fecha: cita.fecha,
    hora: cita.hora,
  });

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="mx-auto max-w-xl text-center"
      role="status"
      aria-live="polite"
    >
      <motion.div
        initial={reduce ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-50 text-accent-500"
      >
        <Check className="h-8 w-8" />
      </motion.div>

      <h2 className="mt-6 text-display-sm text-ink">¡Cita solicitada!</h2>
      <p className="mt-3 text-pretty text-lg leading-relaxed text-ink-soft">
        Tu cita quedó registrada como <strong>pendiente</strong>. Para
        confirmarla, envíame el resumen por WhatsApp con un solo toque.
      </p>

      <dl className="mt-8 space-y-3 rounded-2xl border border-sand-200 bg-white p-6 text-left shadow-soft">
        <Row label="Nombre" value={cita.nombre} />
        <Row label="Servicio" value={nombreServicio} />
        <Row label="Zona" value={cita.zona} />
        <Row label="Dirección" value={cita.direccion} />
        <Row label="Fecha" value={formatDateEs(cita.fecha)} capitalize />
        <Row label="Hora" value={cita.hora} />
      </dl>

      <div className="mt-8 flex flex-col gap-3">
        <ButtonLink href={waLink} size="lg">
          <Whatsapp className="h-5 w-5" />
          Confirmar por WhatsApp
        </ButtonLink>
        <Link
          href="/"
          className="text-sm text-ink-muted underline-offset-4 transition-colors hover:text-accent-600 hover:underline"
        >
          Volver al inicio
        </Link>
      </div>
    </motion.div>
  );
}

function Row({
  label,
  value,
  capitalize,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4 border-b border-sand-100 pb-3 last:border-0 last:pb-0">
      <dt className="text-sm text-ink-muted">{label}</dt>
      <dd className={`text-right font-medium text-ink ${capitalize ? "capitalize" : ""}`}>
        {value}
      </dd>
    </div>
  );
}
