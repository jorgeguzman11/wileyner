import Link from "next/link";
import { Whatsapp, Instagram } from "@/components/ui/icons";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-sand-200 bg-white">
      <div className="container-content py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg font-semibold text-ink">
              {site.nombreCorto}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {site.titulo} en {site.ciudadPrincipal}. Recupera tu movilidad con
              un plan de tratamiento hecho a tu medida.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-sand-100 text-ink-soft transition-colors hover:bg-accent-50 hover:text-accent-600"
              >
                <Whatsapp className="h-5 w-5" />
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-sand-100 text-ink-soft transition-colors hover:bg-accent-50 hover:text-accent-600"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Pie de página">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
              <li><a href="#servicios" className="text-ink-soft transition-colors hover:text-accent-600">Servicios</a></li>
              <li><a href="#sobre-mi" className="text-ink-soft transition-colors hover:text-accent-600">Sobre mí</a></li>
              <li><a href="#testimonios" className="text-ink-soft transition-colors hover:text-accent-600">Testimonios</a></li>
              <li><a href="#faq" className="text-ink-soft transition-colors hover:text-accent-600">Preguntas</a></li>
              <li><Link href="/agendar" className="text-ink-soft transition-colors hover:text-accent-600">Agendar cita</Link></li>
              <li><Link href="/testimonios/nuevo" className="text-ink-soft transition-colors hover:text-accent-600">Dejar testimonio</Link></li>
            </ul>
          </nav>
        </div>

        {/* Aviso médico obligatorio */}
        <div className="mt-10 border-t border-sand-100 pt-6">
          <p className="text-pretty text-xs leading-relaxed text-ink-muted">
            <strong className="font-medium text-ink-soft">Aviso:</strong> La
            información de este sitio tiene fines orientativos y no sustituye una
            consulta médica ni un diagnóstico profesional. Ante cualquier
            síntoma o condición de salud, consulta a un profesional calificado.
          </p>
          <p className="mt-4 text-xs text-ink-muted">
            © {year} {site.nombreCompleto}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
