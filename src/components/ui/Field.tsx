import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

const fieldBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder:text-ink-muted/60 shadow-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:border-accent-400";
const normal = "border-sand-300 hover:border-sand-400";
const invalid = "border-red-400 focus-visible:ring-red-300";

// --- Label ------------------------------------------------------------------
export function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-medium text-ink-soft"
    >
      {children}
      {required && (
        <span className="text-accent-500" aria-hidden>
          {" "}
          *
        </span>
      )}
    </label>
  );
}

// --- Mensaje de error --------------------------------------------------------
export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-red-600">
      {message}
    </p>
  );
}

// --- Input ------------------------------------------------------------------
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(fieldBase, error ? invalid : normal, className)}
      {...props}
    />
  ),
);
Input.displayName = "Input";

// --- Textarea ---------------------------------------------------------------
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(fieldBase, "min-h-28 resize-y", error ? invalid : normal, className)}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

// --- Select -----------------------------------------------------------------
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
};
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        fieldBase,
        "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 fill=%22none%22 stroke=%22%2357514a%22 stroke-width=%221.75%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:20px] bg-[right_0.9rem_center] bg-no-repeat pr-11",
        error ? invalid : normal,
        className,
      )}
      {...props}
    >
      {children}
    </select>
  ),
);
Select.displayName = "Select";

/** Hook para ligar label + error a un input (accesibilidad). */
export function useFieldIds(name: string) {
  const uid = useId();
  return { fieldId: `${name}-${uid}`, errorId: `${name}-${uid}-error` };
}
