"use client";

import { useState, useId } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "./icons";
import { cn } from "@/lib/cn";

type Item = { pregunta: string; respuesta: string };

/**
 * Acordeón accesible con altura animada.
 * - Botón con aria-expanded / aria-controls.
 * - Región con role="region" y aria-labelledby.
 * - prefers-reduced-motion: sin animación de altura, sólo mostrar/ocultar.
 */
export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="divide-y divide-sand-200 overflow-hidden rounded-2xl border border-sand-200 bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={i}>
            <h3 className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-sand-50 focus-visible:bg-sand-50 sm:px-6"
              >
                <span className="font-display text-lg font-medium text-ink">
                  {item.pregunta}
                </span>
                <ChevronDown
                  className={cn(
                    "shrink-0 text-accent-500 transition-transform duration-300 motion-reduce:transition-none",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <AccordionPanel id={panelId} labelledBy={btnId} open={isOpen}>
              {item.respuesta}
            </AccordionPanel>
          </div>
        );
      })}
    </div>
  );
}

function AccordionPanel({
  id,
  labelledBy,
  open,
  children,
}: {
  id: string;
  labelledBy: string;
  open: boolean;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={id}
          role="region"
          aria-labelledby={labelledBy}
          key="content"
          initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <p className="px-5 pb-5 text-pretty leading-relaxed text-ink-soft sm:px-6">
            {children}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
