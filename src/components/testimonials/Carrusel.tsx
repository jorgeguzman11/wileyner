"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { TestimonialCard } from "./TestimonialCard";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
import type { Testimonial } from "@/lib/types";
import { cn } from "@/lib/cn";

/**
 * Carrusel de testimonios:
 * - Desplazamiento suave con scroll-snap.
 * - Navegación por teclado (flechas ← →) cuando el carrusel tiene foco.
 * - Botones anterior/siguiente con estado deshabilitado en los extremos.
 * - Respeta prefers-reduced-motion (salta sin animación).
 */
export function Carrusel({ testimonios }: { testimonios: Testimonial[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    const slide = el.querySelector<HTMLElement>("[data-slide]");
    if (slide) {
      const gap = 16;
      setActive(Math.round(el.scrollLeft / (slide.offsetWidth + gap)));
    }
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = trackRef.current;
      if (!el) return;
      const slide = el.querySelector<HTMLElement>("[data-slide]");
      if (!slide) return;
      const gap = 16;
      const clamped = Math.max(0, Math.min(testimonios.length - 1, index));
      el.scrollTo({
        left: clamped * (slide.offsetWidth + gap),
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [reduce, testimonios.length],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToIndex(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToIndex(active - 1);
    }
  };

  return (
    <div
      role="group"
      aria-roledescription="carrusel"
      aria-label="Testimonios de pacientes"
      className="relative"
    >
      <ul
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Usa las flechas izquierda y derecha para navegar"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400 [&::-webkit-scrollbar]:hidden"
      >
        {testimonios.map((t, i) => (
          <li
            key={t.id}
            data-slide
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${testimonios.length}`}
            className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
          >
            <TestimonialCard t={t} />
          </li>
        ))}
      </ul>

      {/* Controles */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-2" aria-hidden>
          {testimonios.map((_, i) => (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              onClick={() => scrollToIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === active
                  ? "w-6 bg-accent-500"
                  : "w-2 bg-sand-300 hover:bg-sand-400",
              )}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <CarruselBtn
            label="Testimonio anterior"
            disabled={atStart}
            onClick={() => scrollToIndex(active - 1)}
          >
            <ChevronLeft />
          </CarruselBtn>
          <CarruselBtn
            label="Testimonio siguiente"
            disabled={atEnd}
            onClick={() => scrollToIndex(active + 1)}
          >
            <ChevronRight />
          </CarruselBtn>
        </div>
      </div>
    </div>
  );
}

function CarruselBtn({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-sand-300 bg-white text-ink shadow-soft transition-[transform,color,border-color,opacity] duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:border-accent-300 hover:text-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.94] disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:active:scale-100"
    >
      {children}
    </button>
  );
}
