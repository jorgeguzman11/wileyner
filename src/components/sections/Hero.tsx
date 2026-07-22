"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Whatsapp, MapPin, Check } from "@/components/ui/icons";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";

export function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] as const },
    },
  };

  return (
    <section className="relative overflow-hidden">
      {/* Fondo cálido con acento sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-accent-50/60 via-sand-50 to-sand-50"
      />
      <div className="container-content grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.p
            variants={item}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-100 bg-white/70 px-4 py-1.5 text-sm text-accent-600 shadow-soft"
          >
            <MapPin className="h-4 w-4" />
            {site.titulo} · {site.ciudadPrincipal} y alrededores
          </motion.p>

          <motion.h1
            variants={item}
            className="text-display-lg text-ink"
          >
            {site.propuestaValor}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft"
          >
            {site.subtitulo}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink href="/agendar" size="lg">
              Agendar cita
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink
              href={whatsappLink()}
              variant="secondary"
              size="lg"
            >
              <Whatsapp className="h-5 w-5 text-accent-500" />
              Escribir por WhatsApp
            </ButtonLink>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft"
          >
            {[
              "Atención a domicilio",
              "Plan de tratamiento individualizado",
              "Atención cercana y profesional",
            ].map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-accent-500" />
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Retrato */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-accent-50 shadow-lift ring-1 ring-sand-200">
            {/* PLACEHOLDER: sustituye /profesional.svg por la foto real (ideal .jpg/.webp) */}
            <Image
              src="/profesional.svg"
              alt={`${site.nombreCompleto}, ${site.profesion}`}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-sand-200 bg-white/95 px-5 py-4 shadow-soft backdrop-blur sm:block">
            <p className="font-display text-2xl font-semibold text-accent-500">
              +{site.aniosExperiencia} años
            </p>
            <p className="text-sm text-ink-muted">de experiencia clínica</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
