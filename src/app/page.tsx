import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Servicios } from "@/components/sections/Servicios";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { SobreMi } from "@/components/sections/SobreMi";
import { Testimonios } from "@/components/sections/Testimonios";
import { FAQ } from "@/components/sections/FAQ";
import { Contacto } from "@/components/sections/Contacto";
import { Footer } from "@/components/sections/Footer";
import { WhatsappFloat } from "@/components/ui/WhatsappFloat";

// Regenera la página cada 5 min para reflejar testimonios recién aprobados.
export const revalidate = 300;

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <Servicios />
        <ComoFunciona />
        <SobreMi />
        {/* Server Component asíncrono: lee testimonios aprobados de Supabase */}
        <Testimonios />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
      <WhatsappFloat />
    </>
  );
}
