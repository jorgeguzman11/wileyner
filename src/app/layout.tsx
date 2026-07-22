import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { site } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tu-dominio.com";
const tituloSeo = `${site.nombreCorto} · Fisioterapeuta en ${site.ciudadPrincipal}`;
const descripcionSeo = `${site.titulo} en ${site.ciudadPrincipal}. Fisioterapia deportiva, traumatológica, geriátrica, neurológica y estimulación temprana. Atención en consultorio y a domicilio. Agenda tu cita.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: tituloSeo,
    template: `%s · ${site.nombreCorto}`,
  },
  description: descripcionSeo,
  keywords: [
    "fisioterapeuta",
    `fisioterapeuta en ${site.ciudadPrincipal}`,
    "fisioterapia deportiva",
    "rehabilitación",
    "fisioterapia a domicilio",
    ...site.zonas.map((z) => `fisioterapeuta ${z}`),
  ],
  authors: [{ name: site.nombreCompleto }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: siteUrl,
    siteName: site.nombreCorto,
    title: tituloSeo,
    description: descripcionSeo,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: site.nombreCorto }],
  },
  twitter: {
    card: "summary_large_image",
    title: tituloSeo,
    description: descripcionSeo,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

/** schema.org — MedicalBusiness para SEO local. */
function LocalBusinessJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": siteUrl,
    name: `${site.nombreCorto} — Fisioterapia`,
    description: descripcionSeo,
    url: siteUrl,
    telephone: site.whatsapp,
    medicalSpecialty: "Physiotherapy",
    priceRange: "$$",
    image: `${siteUrl}/og-image.jpg`,
    areaServed: site.zonas.map((z) => ({ "@type": "City", name: z })),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.ciudadPrincipal,
      addressCountry: "VE",
      streetAddress: site.direccion,
    },
    sameAs: [site.instagramUrl],
    openingHours: "Mo-Su 08:00-18:00",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido
        </a>
        {children}
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
