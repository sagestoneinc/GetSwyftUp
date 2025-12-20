import { ButtonHTMLAttributes, cloneElement, forwardRef, isValidElement } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  asChild?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[radial-gradient(circle_at_30%_30%,rgba(54,213,255,0.35),transparent_40%),linear-gradient(135deg,var(--brand-1),var(--brand-2))] text-white shadow-[var(--shadow-elevated)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.45)]",
  secondary:
    "bg-[rgba(255,255,255,0.04)] text-text border border-white/10 hover:border-[var(--accent)] hover:text-white",
  ghost:
    "bg-transparent text-muted border border-transparent hover:border-white/10 hover:text-text",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] px-4 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 active:translate-y-[1px]";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", asChild = false, children, ...props }, ref) => {
    const composed = cn(baseStyles, variantStyles[variant], className);

    if (asChild && isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return cloneElement(child, {
        className: cn(child.props.className, composed),
      });
    }

    return (
      <button ref={ref} className={composed} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
