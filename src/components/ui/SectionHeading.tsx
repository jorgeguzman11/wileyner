import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  id,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent-500">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-display-md text-ink">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-soft">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
