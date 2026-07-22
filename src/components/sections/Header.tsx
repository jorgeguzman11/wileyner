"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site-config";
import { cn } from "@/lib/cn";

const nav = [
  { href: "#servicios", label: "Servicios" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#faq", label: "Preguntas" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled
          ? "border-sand-200 bg-sand-50/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-content flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-ink"
        >
          {site.nombreCorto}
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm text-ink-soft transition-colors hover:text-accent-600"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink href="/agendar" size="md">
            Agendar cita
          </ButtonLink>
        </div>

        {/* Botón menú móvil */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand-100 lg:hidden"
        >
          <span className="sr-only">Menú</span>
          <div className="flex w-5 flex-col gap-[5px]">
            <span
              className={cn(
                "h-0.5 w-full origin-center rounded-full bg-current transition-transform duration-300",
                open && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-0.5 w-full rounded-full bg-current transition-opacity duration-200",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "h-0.5 w-full origin-center rounded-full bg-current transition-transform duration-300",
                open && "-translate-y-[7px] -rotate-45",
              )}
            />
          </div>
        </button>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-movil"
            aria-label="Principal móvil"
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden border-t border-sand-200 bg-sand-50 lg:hidden"
          >
            <ul className="container-content flex flex-col py-4">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base text-ink-soft transition-colors hover:bg-sand-100 hover:text-accent-600"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-3 px-3">
                <ButtonLink href="/agendar" size="lg" className="w-full">
                  Agendar cita
                </ButtonLink>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
