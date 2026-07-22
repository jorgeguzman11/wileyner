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
          eyebrow="Contacto y ubicación"
          title="Estoy para ayudarte"
          intro="Agenda en línea o escríbeme directamente. Atención en consultorio y a domicilio."
          id="contacto-title"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal className="space-y-4">
            <ul className="space-y-4">
              <InfoRow icon={<Clock className="h-5 w-5" />} label="Horario">
                {site.horarioTexto}
              </InfoRow>
              <InfoRow icon={<Home className="h-5 w-5" />} label="Modalidad">
                Consultorio y atención a domicilio
              </InfoRow>
              <InfoRow icon={<MapPin className="h-5 w-5" />} label="Zonas de atención">
                {site.zonas.join(" · ")}
              </InfoRow>
              <InfoRow icon={<MapPin className="h-5 w-5" />} label="Dirección">
                {site.direccion}
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
            <div className="overflow-hidden rounded-2xl border border-sand-200 shadow-soft">
              {/* PLACEHOLDER: reemplaza mapaEmbedUrl con el embed real del consultorio */}
              <iframe
                title={`Ubicación de ${site.nombreCorto} en ${site.ciudadPrincipal}`}
                src={site.mapaEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full"
              />
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
