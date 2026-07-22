import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Whatsapp, Instagram, MapPin, Clock, Home } from "@/components/ui/icons";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";

export function Contacto() {
  return (
    <section id="contacto" className="section-pad scroll-mt-20">
      <div className="container-content">
        <SectionHeading
          eyebrow="Contacto y cobertura"
          title="Voy hasta donde estés"
          intro="Atención de fisioterapia 100% a domicilio. Agenda en línea o escríbeme directamente."
          id="contacto-title"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal className="space-y-4">
            <ul className="space-y-4">
              <InfoRow icon={<Home className="h-5 w-5" />} label="Servicio">
                Fisioterapia a domicilio — voy hasta tu casa
              </InfoRow>
              <InfoRow icon={<Clock className="h-5 w-5" />} label="Horario">
                {site.horarioTexto}
              </InfoRow>
              <InfoRow icon={<MapPin className="h-5 w-5" />} label="Zonas de atención">
                {site.zonas.join(" · ")}
              </InfoRow>
            </ul>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <ButtonLink href={whatsappLink()} size="lg">
                <Whatsapp className="h-5 w-5" />
                {site.whatsappDisplay}
              </ButtonLink>
              <ButtonLink
                href={site.instagramUrl}
                variant="secondary"
                size="lg"
              >
                <Instagram className="h-5 w-5 text-accent-500" />
                @{site.instagram}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-sand-200 bg-white p-8 shadow-soft">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-50 text-accent-500">
                <Home className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-medium text-ink">
                Zonas de cobertura
              </h3>
              <p className="mt-2 text-pretty leading-relaxed text-ink-soft">
                Atiendo a domicilio en estas zonas. Al agendar eliges la tuya e
                indicas la dirección de la visita.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {site.zonas.map((z) => (
                  <li
                    key={z}
                    className="inline-flex items-center gap-1.5 rounded-full border border-accent-100 bg-accent-50/60 px-3 py-1.5 text-sm text-accent-700"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    {z}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-ink-muted">
                ¿No ves tu zona?{" "}
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent-600 underline-offset-4 hover:underline"
                >
                  Escríbeme por WhatsApp
                </a>{" "}
                y lo coordinamos.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4 rounded-xl border border-sand-200 bg-white p-4 shadow-soft">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-500">
        {icon}
      </span>
      <div>
        <p className="text-sm font-medium text-ink-muted">{label}</p>
        <p className="text-ink">{children}</p>
      </div>
    </li>
  );
}
