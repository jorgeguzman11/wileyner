import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

// Press feedback via scale(0.97) + strong custom ease-out; keep it fast (<160ms).
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[transform,background-color,color,box-shadow] duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.97] motion-reduce:active:scale-100";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-500 text-white shadow-soft hover:bg-accent-600 hover:shadow-lift",
  secondary:
    "bg-white text-ink ring-1 ring-sand-300 hover:ring-accent-300 hover:text-accent-600 shadow-soft",
  ghost: "text-ink-soft hover:text-accent-600 hover:bg-accent-50",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

// --- Botón <button> ---------------------------------------------------------
type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  ),
);
Button.displayName = "Button";

// --- Enlace con estilo de botón --------------------------------------------
type ButtonLinkProps = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const external = href.startsWith("http") || href.startsWith("https");
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
