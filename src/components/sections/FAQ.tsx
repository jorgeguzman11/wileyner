import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { faq } from "@/content/faq";

export function FAQ() {
  return (
    <section id="faq" className="section-pad scroll-mt-20 bg-white">
      <div className="container-content max-w-3xl">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Resuelve tus dudas"
          align="center"
          id="faq-title"
        />
        <Reveal>
          <Accordion items={faq} />
        </Reveal>
      </div>

      {/* schema.org FAQPage para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.pregunta,
              acceptedAnswer: { "@type": "Answer", text: f.respuesta },
            })),
          }),
        }}
      />
    </section>
  );
}
