import { Star } from "./icons";

/** Muestra una calificación de 1 a 5 estrellas (accesible). */
export function Stars({ value, className }: { value: number; className?: string }) {
  const v = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div
      className={className}
      role="img"
      aria-label={`Calificación: ${v} de 5 estrellas`}
    >
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            filled={i < v}
            className={i < v ? "h-4 w-4 text-amber-400" : "h-4 w-4 text-sand-300"}
          />
        ))}
      </div>
    </div>
  );
}
