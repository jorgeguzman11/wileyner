"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { testimonialSchema, type TestimonialInput } from "@/lib/schemas";
import { Label, Input, Textarea, FieldError } from "@/components/ui/Field";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Star, Check, Spinner } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export function TestimonialForm() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [hover, setHover] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialInput>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: { nombre: "", tratamiento: "", texto: "", calificacion: 0 },
  });

  const onSubmit = async (data: TestimonialInput) => {
    setServerError(null);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setServerError(body.error ?? "No pudimos guardar tu testimonio.");
        return;
      }
      setDone(true);
    } catch {
      setServerError("Hubo un problema de conexión. Intenta de nuevo.");
    }
  };

  if (done) {
    return (
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="mx-auto max-w-lg text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-50 text-accent-500">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-display-sm text-ink">¡Gracias por compartir!</h2>
        <p className="mt-3 text-pretty text-lg leading-relaxed text-ink-soft">
          Tu testimonio se envió correctamente. Lo revisaré antes de publicarlo
          en el sitio.
        </p>
        <ButtonLink href="/" className="mt-8">
          Volver al inicio
        </ButtonLink>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div>
        <Label htmlFor="nombre" required>Tu nombre</Label>
        <Input
          id="nombre"
          autoComplete="name"
          error={!!errors.nombre}
          aria-invalid={!!errors.nombre}
          aria-describedby={errors.nombre ? "t-nombre-error" : undefined}
          {...register("nombre")}
        />
        <FieldError id="t-nombre-error" message={errors.nombre?.message} />
      </div>

      <div>
        <Label htmlFor="tratamiento" required>¿Qué tratamiento recibiste?</Label>
        <Input
          id="tratamiento"
          placeholder="Ej. Rehabilitación de rodilla"
          error={!!errors.tratamiento}
          aria-invalid={!!errors.tratamiento}
          aria-describedby={errors.tratamiento ? "t-trat-error" : undefined}
          {...register("tratamiento")}
        />
        <FieldError id="t-trat-error" message={errors.tratamiento?.message} />
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-medium text-ink-soft">
          Calificación <span className="text-accent-500" aria-hidden> *</span>
        </span>
        <Controller
          control={control}
          name="calificacion"
          render={({ field }) => (
            <div
              role="radiogroup"
              aria-label="Calificación de 1 a 5 estrellas"
              className="flex gap-1"
            >
              {[1, 2, 3, 4, 5].map((n) => {
                const active = (hover || field.value) >= n;
                return (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={field.value === n}
                    aria-label={`${n} ${n === 1 ? "estrella" : "estrellas"}`}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    onFocus={() => setHover(n)}
                    onBlur={() => setHover(0)}
                    onClick={() => field.onChange(n)}
                    className="rounded p-1 transition-transform duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95 motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
                  >
                    <Star
                      filled={active}
                      className={cn(
                        "h-8 w-8 transition-colors",
                        active ? "text-amber-400" : "text-sand-300",
                      )}
                    />
                  </button>
                );
              })}
            </div>
          )}
        />
        <FieldError id="t-calif-error" message={errors.calificacion?.message} />
      </div>

      <div>
        <Label htmlFor="texto" required>Tu experiencia</Label>
        <Textarea
          id="texto"
          rows={5}
          placeholder="Cuéntanos cómo fue tu experiencia y cómo te ayudó el tratamiento."
          error={!!errors.texto}
          aria-invalid={!!errors.texto}
          aria-describedby={errors.texto ? "t-texto-error" : undefined}
          {...register("texto")}
        />
        <FieldError id="t-texto-error" message={errors.texto?.message} />
      </div>

      <AnimatePresence>
        {serverError && (
          <motion.p
            role="alert"
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            className="overflow-hidden rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {serverError}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between gap-4 border-t border-sand-200 pt-6">
        <Link href="/" className="text-sm text-ink-muted underline-offset-4 hover:text-accent-600 hover:underline">
          Cancelar
        </Link>
        <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-44">
          {isSubmitting ? (
            <>
              <Spinner className="h-5 w-5" />
              Enviando…
            </>
          ) : (
            "Enviar testimonio"
          )}
        </Button>
      </div>
    </form>
  );
}
