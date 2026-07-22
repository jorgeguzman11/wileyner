"use client";

import { Whatsapp } from "./icons";
import { whatsappLink } from "@/lib/whatsapp";

/** Botón flotante de WhatsApp, útil en móvil. */
export function WhatsappFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 text-white shadow-lift transition-[transform,background-color] duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:bg-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95 motion-reduce:active:scale-100"
    >
      <Whatsapp className="h-7 w-7" />
    </a>
  );
}
