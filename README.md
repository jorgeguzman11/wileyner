# Wileyner Rangel · Sitio de Fisioterapia

Sitio web profesional para captar pacientes, con **agendamiento de citas** y
**testimonios moderados**. Construido con Next.js (App Router), TypeScript,
Tailwind CSS, Supabase y Framer Motion. Listo para desplegar en Vercel.

## ✨ Características

- **Landing de una página** con secciones ancladas: Hero, Servicios, Cómo
  funciona, Sobre mí, Testimonios, Preguntas frecuentes y Contacto.
- **Agendamiento** en `/agendar`: calendario que bloquea días no laborables y
  horas ocupadas (leídas de Supabase), validación con `react-hook-form` + `zod`,
  y confirmación con enlace de WhatsApp prellenado.
- **Panel del profesional** en `/admin`: citas de hoy y de la semana, cambio de
  estado (confirmada / atendida / cancelada) y moderación de testimonios.
- **Testimonios** con carrusel accesible y formulario público
  (`/testimonios/nuevo`) que entra pendiente de aprobación.
- **Accesible** (contraste AA, navegación por teclado, foco visible) y
  **mobile-first**, con animaciones que respetan `prefers-reduced-motion`.
- **SEO local**: metadata, Open Graph, `schema.org` (MedicalBusiness + FAQPage),
  `sitemap.xml` y `robots.txt`.

## 🧱 Stack

| Área | Tecnología |
| --- | --- |
| Framework | Next.js 14 (App Router) + TypeScript |
| Estilos | Tailwind CSS (tokens de diseño propios) |
| Datos | Supabase (Postgres + RLS) |
| Formularios | react-hook-form + zod |
| Animación | Framer Motion |
| Despliegue | Vercel |

---

## 🚀 Puesta en marcha

### 1. Requisitos

- Node.js 18.18+ (recomendado 20+)
- Una cuenta de [Supabase](https://supabase.com) (plan gratuito sirve)

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Supabase

1. Crea un proyecto en Supabase.
2. Ve a **SQL Editor → New query**, pega el contenido de
   [`supabase/schema.sql`](./supabase/schema.sql) y ejecútalo. Esto crea las
   tablas (`services`, `availability`, `blocked_dates`, `appointments`,
   `testimonials`), sus **políticas RLS** y datos de ejemplo.
3. En **Project Settings → API** copia:
   - `Project URL`
   - `anon public key`
   - `service_role key` (secreta)

### 4. Variables de entorno

Copia el ejemplo y rellena tus valores:

```bash
cp .env.example .env.local
```

| Variable | Descripción |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública (protegida por RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave secreta, **solo servidor** |
| `ADMIN_PASSWORD` | Contraseña del panel `/admin` |
| `NEXT_PUBLIC_SITE_URL` | URL canónica en producción |

### 5. Ejecutar en local

```bash
npm run dev
```

- Sitio: http://localhost:3000
- Agendar: http://localhost:3000/agendar
- Panel: http://localhost:3000/admin (usa `ADMIN_PASSWORD`)

> Sin las variables de Supabase el sitio **arranca igual**: los testimonios se
> muestran vacíos y el agendamiento avisa que no está configurado. Configúralo
> para activar los datos reales.

---

## ☁️ Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. En Vercel: **New Project → Import** el repo.
3. Añade las variables de entorno del paso 4 (marca `SUPABASE_SERVICE_ROLE_KEY`
   y `ADMIN_PASSWORD` como *Secret*).
4. Deploy. Vercel detecta Next.js automáticamente.

---

## 🗃️ Modelo de datos y seguridad (RLS)

- **services / availability / blocked_dates**: lectura pública (catálogos).
- **appointments**: el público solo puede **crear** citas (estado `pendiente`);
  **no puede leerlas**. Las horas ocupadas se calculan en el servidor y se
  exponen solo como *slots libres*.
- **testimonials**: el público solo lee los **aprobados** y crea nuevos como
  **no aprobados**. La aprobación se hace desde `/admin` (o por SQL).

El panel y las operaciones sensibles usan la `service_role` **solo en rutas API
del servidor**, nunca en el navegador.

### Gestión rápida por SQL (opcional)

```sql
-- Bloquear un día no laborable
insert into public.blocked_dates (fecha, motivo) values ('2026-12-25', 'Feriado');

-- Ajustar horario de un día (0=domingo … 6=sábado)
update public.availability set start_time='09:00', end_time='13:00' where weekday=6;

-- Publicar un testimonio manualmente
update public.testimonials set aprobado = true where id = 'UUID_DEL_TESTIMONIO';
```

---

## 📁 Estructura

```
src/
├── app/                 # rutas (landing, /agendar, /admin, /testimonios, /api)
├── components/
│   ├── ui/              # sistema de diseño (Button, Field, Accordion, iconos…)
│   ├── sections/        # secciones de la landing
│   ├── booking/         # calendario, horas, formulario y confirmación
│   ├── testimonials/    # carrusel, tarjeta y formulario
│   ├── admin/           # panel del profesional
│   └── motion/          # primitivas de animación (respetan reduced-motion)
├── content/             # servicios y preguntas frecuentes
└── lib/                 # supabase, validaciones, disponibilidad, config
supabase/schema.sql      # tablas + RLS + seed
```

---

## ⚠️ Pendientes por completar (PLACEHOLDERS)

Revisa y reemplaza antes de publicar:

- [ ] **Foto real** del profesional → sustituye `public/profesional.svg`
      (ideal `.jpg`/`.webp`) y actualiza el `src` en `Hero.tsx` y `SobreMi.tsx`.
- [ ] **Imagen Open Graph** → añade `public/og-image.jpg` (1200×630).
- [ ] **Instagram** → confirma el handle exacto en `src/lib/site-config.ts`
      (se asumió `@wileynerrangel`).
- [ ] **Horario real** → el negocio indicó “todos los días”. Se dejó
      08:00–18:00 con turnos de 45 min. Ajusta la tabla `availability` en
      `supabase/schema.sql` y el texto `horarioTexto` en `site-config.ts`.
- [ ] **Zonas de cobertura** → la atención es 100% a domicilio; revisa la
      lista `zonas` en `site-config.ts` (Caracas, Guarenas, Guatire, Los Teques).
- [ ] **Correo de contacto** → `email` en `site-config.ts`.
- [ ] **Testimonios de ejemplo** → los del seed entran como *no aprobados* y no
      se muestran. Publica solo testimonios reales desde `/admin`.
- [ ] **ADMIN_PASSWORD** → elige una contraseña fuerte en producción.
- [ ] **NEXT_PUBLIC_SITE_URL** → tu dominio final.

---

## 🎨 Notas de diseño

Estética calmada, clínica pero cálida: base neutra en tonos arena, un único
acento verde-pino, tipografía con jerarquía real (Fraunces para títulos, Inter
para texto), espaciado generoso y sombras contenidas. Las animaciones son
sutiles y cortas, con curvas de *easing* fuertes y respeto total a
`prefers-reduced-motion`.
