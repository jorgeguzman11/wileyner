-- ============================================================================
--  Wileyner Rangel · Fisioterapia — Esquema de base de datos (Supabase)
--  Ejecuta este archivo en: Supabase Dashboard → SQL Editor → New query
--  Incluye: tablas, políticas RLS y datos de ejemplo (PLACEHOLDER).
-- ============================================================================

-- Extensión para UUIDs
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
--  SERVICES — especialidades ofrecidas
-- ---------------------------------------------------------------------------
create table if not exists public.services (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  nombre       text not null,
  descripcion  text not null,
  duracion_min int  not null default 45,
  orden        int  not null default 0,
  activo       boolean not null default true,
  created_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
--  AVAILABILITY — horario laboral recurrente por día de la semana
--  weekday: 0=domingo ... 6=sábado
-- ---------------------------------------------------------------------------
create table if not exists public.availability (
  id          uuid primary key default gen_random_uuid(),
  weekday     int  not null check (weekday between 0 and 6),
  start_time  time not null,
  end_time    time not null,
  slot_min    int  not null default 45,
  activo      boolean not null default true
);

-- ---------------------------------------------------------------------------
--  BLOCKED_DATES — días no laborables puntuales (feriados / vacaciones)
-- ---------------------------------------------------------------------------
create table if not exists public.blocked_dates (
  id      uuid primary key default gen_random_uuid(),
  fecha   date unique not null,
  motivo  text
);

-- ---------------------------------------------------------------------------
--  APPOINTMENTS — citas
-- ---------------------------------------------------------------------------
create table if not exists public.appointments (
  id          uuid primary key default gen_random_uuid(),
  nombre      text not null,
  telefono    text not null,
  email       text not null,
  service_id  uuid references public.services(id) on delete set null,
  modalidad   text not null check (modalidad in ('consultorio','domicilio')),
  fecha       date not null,
  hora        time not null,
  motivo      text,
  estado      text not null default 'pendiente'
              check (estado in ('pendiente','confirmada','atendida','cancelada')),
  created_at  timestamptz not null default now()
);

-- Evita doble reserva del mismo turno (fecha + hora) salvo citas canceladas.
create unique index if not exists appointments_slot_unique
  on public.appointments (fecha, hora)
  where estado <> 'cancelada';

create index if not exists appointments_fecha_idx on public.appointments (fecha);

-- ---------------------------------------------------------------------------
--  TESTIMONIALS — testimonios con moderación
-- ---------------------------------------------------------------------------
create table if not exists public.testimonials (
  id            uuid primary key default gen_random_uuid(),
  nombre        text not null,
  foto_url      text,
  tratamiento   text not null,
  texto         text not null,
  calificacion  int  not null check (calificacion between 1 and 5),
  aprobado      boolean not null default false,
  created_at    timestamptz not null default now()
);

create index if not exists testimonials_aprobado_idx on public.testimonials (aprobado);

-- ============================================================================
--  ROW LEVEL SECURITY
--  Modelo: el público usa la clave anon (browser). El administrador y las
--  operaciones sensibles usan la clave service_role desde rutas API del
--  servidor, que OMITE RLS. Por eso a la clave anon sólo le damos:
--    - lectura de catálogos activos
--    - lectura de testimonios aprobados
--    - INSERT de citas y testimonios (creación por el paciente)
--  y nunca lectura de citas ni de testimonios sin aprobar.
-- ============================================================================

alter table public.services      enable row level security;
alter table public.availability  enable row level security;
alter table public.blocked_dates enable row level security;
alter table public.appointments  enable row level security;
alter table public.testimonials  enable row level security;

-- ---- SERVICES: lectura pública de los activos --------------------------------
drop policy if exists services_select_public on public.services;
create policy services_select_public on public.services
  for select using (activo = true);

-- ---- AVAILABILITY: lectura pública de horarios activos -----------------------
drop policy if exists availability_select_public on public.availability;
create policy availability_select_public on public.availability
  for select using (activo = true);

-- ---- BLOCKED_DATES: lectura pública (para pintar el calendario) --------------
drop policy if exists blocked_dates_select_public on public.blocked_dates;
create policy blocked_dates_select_public on public.blocked_dates
  for select using (true);

-- ---- APPOINTMENTS: el público SÓLO puede crear (insert), nunca leer ----------
-- (La confirmación de horas ocupadas la calcula el servidor con service_role.)
drop policy if exists appointments_insert_public on public.appointments;
create policy appointments_insert_public on public.appointments
  for insert with check (
    estado = 'pendiente'
    and modalidad in ('consultorio','domicilio')
  );
-- Sin política de SELECT/UPDATE/DELETE para anon: quedan denegadas.

-- ---- TESTIMONIALS: leer sólo aprobados; crear siempre como NO aprobado -------
drop policy if exists testimonials_select_public on public.testimonials;
create policy testimonials_select_public on public.testimonials
  for select using (aprobado = true);

drop policy if exists testimonials_insert_public on public.testimonials;
create policy testimonials_insert_public on public.testimonials
  for insert with check (aprobado = false);
-- Sin UPDATE/DELETE para anon: la moderación va por service_role.

-- ============================================================================
--  SEED — datos de ejemplo (PLACEHOLDER). Bórralos o edítalos según necesites.
-- ============================================================================

-- Servicios (coinciden con src/content/services.ts)
insert into public.services (slug, nombre, descripcion, duracion_min, orden) values
  ('deportiva',              'Fisioterapia deportiva',        'Recuperación de lesiones, prevención y retorno seguro a la actividad física y al rendimiento.', 45, 1),
  ('traumatologica',         'Fisioterapia traumatológica',   'Rehabilitación tras fracturas, esguinces, cirugías y lesiones musculoesqueléticas.',           45, 2),
  ('geriatrica',             'Fisioterapia geriátrica',       'Movilidad, equilibrio y autonomía para el adulto mayor, con un trato cercano y paciente.',      45, 3),
  ('neurologica',            'Fisioterapia neurológica',      'Reeducación del movimiento y la funcionalidad en condiciones de origen neurológico.',           60, 4),
  ('estimulacion-temprana',  'Estimulación temprana',         'Acompañamiento del desarrollo motor infantil mediante ejercicios y juego guiado.',              45, 5)
on conflict (slug) do nothing;

-- Horario laboral — PLACEHOLDER: "todos los días" 08:00–18:00, turnos de 45 min.
-- Ajusta las horas reales del profesional aquí.
insert into public.availability (weekday, start_time, end_time, slot_min, activo) values
  (0, '08:00', '18:00', 45, true),  -- domingo
  (1, '08:00', '18:00', 45, true),  -- lunes
  (2, '08:00', '18:00', 45, true),  -- martes
  (3, '08:00', '18:00', 45, true),  -- miércoles
  (4, '08:00', '18:00', 45, true),  -- jueves
  (5, '08:00', '18:00', 45, true),  -- viernes
  (6, '08:00', '18:00', 45, true)   -- sábado
on conflict do nothing;

-- Testimonios de ejemplo — PLACEHOLDER, claramente marcados. NO son reales.
-- Se insertan como aprobado=false para que NO se muestren hasta que el
-- profesional publique testimonios reales.
insert into public.testimonials (nombre, tratamiento, texto, calificacion, aprobado) values
  ('[PLACEHOLDER] Paciente de ejemplo', 'Rehabilitación de rodilla',
   'Texto de ejemplo — reemplázalo por un testimonio real aprobado por el paciente.', 5, false),
  ('[PLACEHOLDER] Paciente de ejemplo', 'Dolor lumbar',
   'Texto de ejemplo — reemplázalo por un testimonio real aprobado por el paciente.', 5, false)
on conflict do nothing;

-- ============================================================================
--  Para PUBLICAR un testimonio (moderación manual):
--    update public.testimonials set aprobado = true where id = '...';
--  Para BLOQUEAR un día no laborable:
--    insert into public.blocked_dates (fecha, motivo) values ('2026-12-25','Feriado');
-- ============================================================================
