"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { appointmentSchema, type AppointmentInput } from "@/lib/schemas";
import { services } from "@/content/services";
import { site } from "@/lib/site-config";
import { Label, Input, Select, Textarea, FieldError } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { DatePicker } from "./DatePicker";
import { TimeSlots } from "./TimeSlots";
import { Confirmacion } from "./Confirmacion";
import { Spinner } from "@/components/ui/icons";

type Enviada = AppointmentInput;

export function BookingForm() {
  const reduce = useReducedMotion();
  const [enviada, setEnviada] = useState<Enviada | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      nombre: "",
      telefono: "",
      email: "",
      servicio: undefined,
      zona: undefined,
      direccion: "",
      fecha: "",
      hora: "",
      motivo: "",
    },
  });

  const fecha = watch("fecha");

  const onSubmit = async (data: AppointmentInput) => {
    setServerError(null);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setServerError(
          body.error ?? "No pudimos guardar tu cita. Intenta de nuevo.",
        );
        return;
      }
      setEnviada(data);
    } catch {
      setServerError("Hubo un problema de conexión. Intenta de nuevo.");
    }
  };

  if (enviada) {
    return <Confirmacion cita={enviada} />;
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="space-y-8"
    >
      {/* Datos personales */}
      <fieldset className="space-y-5">
        <legend className="mb-2 font-display text-lg font-medium text-ink">
          Tus datos
        </legend>

        <div>
          <Label htmlFor="nombre" required>Nombre completo</Label>
          <Input
            id="nombre"
            autoComplete="name"
            error={!!errors.nombre}
            aria-invalid={!!errors.nombre}
            aria-describedby={errors.nombre ? "nombre-error" : undefined}
            {...register("nombre")}
          />
          <FieldError id="nombre-error" message={errors.nombre?.message} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="telefono" required>Teléfono / WhatsApp</Label>
            <Input
              id="telefono"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+58 424 000 0000"
              error={!!errors.telefono}
              aria-invalid={!!errors.telefono}
              aria-describedby={errors.telefono ? "telefono-error" : undefined}
              {...register("telefono")}
            />
            <FieldError id="telefono-error" message={errors.telefono?.message} />
          </div>
          <div>
            <Label htmlFor="email" required>Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              error={!!errors.email}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            <FieldError id="email-error" message={errors.email?.message} />
          </div>
        </div>
      </fieldset>

      {/* Detalles de la consulta */}
      <fieldset className="space-y-5">
        <legend className="mb-2 font-display text-lg font-medium text-ink">
          Tu consulta
        </legend>

        <div>
          <Label htmlFor="servicio" required>Motivo de consulta</Label>
          <Select
            id="servicio"
            defaultValue=""
            error={!!errors.servicio}
            aria-invalid={!!errors.servicio}
            aria-describedby={errors.servicio ? "servicio-error" : undefined}
            {...register("servicio")}
          >
            <option value="" disabled>Elige un servicio…</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.nombre}</option>
            ))}
          </Select>
          <FieldError id="servicio-error" message={errors.servicio?.message} />
        </div>

      </fieldset>

      {/* Dónde te atiendo (atención 100% a domicilio) */}
      <fieldset className="space-y-5">
        <legend className="mb-2 font-display text-lg font-medium text-ink">
          ¿Dónde te atiendo?
        </legend>
        <p className="-mt-1 text-sm text-ink-muted">
          Voy hasta ti: la atención es a domicilio.
        </p>

        <div>
          <Label htmlFor="zona" required>Zona</Label>
          <Select
            id="zona"
            defaultValue=""
            error={!!errors.zona}
            aria-invalid={!!errors.zona}
            aria-describedby={errors.zona ? "zona-error" : undefined}
            {...register("zona")}
          >
            <option value="" disabled>Elige tu zona…</option>
            {site.zonas.map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </Select>
          <FieldError id="zona-error" message={errors.zona?.message} />
        </div>

        <div>
          <Label htmlFor="direccion" required>Dirección de la visita</Label>
          <Input
            id="direccion"
            autoComplete="street-address"
            placeholder="Calle, edificio/casa, piso y punto de referencia"
            error={!!errors.direccion}
            aria-invalid={!!errors.direccion}
            aria-describedby={errors.direccion ? "direccion-error" : undefined}
            {...register("direccion")}
          />
          <FieldError id="direccion-error" message={errors.direccion?.message} />
        </div>
      </fieldset>

      {/* Fecha y hora */}
      <fieldset className="space-y-5">
        <legend className="mb-2 font-display text-lg font-medium text-ink">
          Fecha y hora
        </legend>

        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <Controller
              control={control}
              name="fecha"
              render={({ field }) => (
                <DatePicker
                  value={field.value || null}
                  onChange={(iso) => {
                    field.onChange(iso);
                    setValue("hora", "");
                    trigger("fecha");
                  }}
                />
              )}
            />
            <FieldError id="fecha-error" message={errors.fecha?.message} />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-ink-soft">
              Horas disponibles
            </p>
            <Controller
              control={control}
              name="hora"
              render={({ field }) => (
                <TimeSlots
                  date={fecha || null}
                  value={field.value || null}
                  onChange={(h) => {
                    field.onChange(h);
                    trigger("hora");
                  }}
                />
              )}
            />
            <FieldError id="hora-error" message={errors.hora?.message} />
          </div>
        </div>
      </fieldset>

      {/* Motivo opcional */}
      <div>
        <Label htmlFor="motivo">Cuéntame un poco más (opcional)</Label>
        <Textarea
          id="motivo"
          rows={3}
          placeholder="Describe brevemente tu molestia u objetivo."
          error={!!errors.motivo}
          {...register("motivo")}
        />
        <FieldError id="motivo-error" message={errors.motivo?.message} />
      </div>

      {/* Error del servidor */}
      <AnimatePresence>
        {serverError && (
          <motion.p
            role="alert"
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {serverError}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-3 border-t border-sand-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-muted">
          Tu cita quedará como <strong className="font-medium">pendiente</strong> hasta que la confirmes por WhatsApp.
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-48">
          {isSubmitting ? (
            <>
              <Spinner className="h-5 w-5" />
              Enviando…
            </>
          ) : (
            "Solicitar cita"
          )}
        </Button>
      </div>
    </motion.form>
  );
}
