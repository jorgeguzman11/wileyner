import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tu-dominio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/agendar`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/testimonios/nuevo`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];
}
