import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export type GlassButtonTint = "violet" | "cyan" | "emerald" | "rose" | "neutral";
export type GlassButtonSize = "sm" | "md" | "lg";

export interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accent colour of the glow and focus ring */
  tint?: GlassButtonTint;
  /** Button size */
  size?: GlassButtonSize;
  /** Shows a spinner, sets aria-busy and blocks clicks */
  loading?: boolean;
  /** Text read by screen readers while loading */
  loadingLabel?: string;
  /** Icon rendered before the label */
  leftIcon?: ReactNode;
  /** Icon rendered after the label */
  rightIcon?: ReactNode;
  /** Stretch to the width of the parent */
  fullWidth?: boolean;
}

const tintStyles: Record<GlassButtonTint, string> = {
  violet: "from-violet-500/40 to-fuchsia-500/30 focus-visible:ring-violet-300 shadow-violet-500/25",
  cyan: "from-cyan-400/40 to-sky-500/30 focus-visible:ring-cyan-200 shadow-cyan-500/25",
  emerald: "from-emerald-400/40 to-teal-500/30 focus-visible:ring-emerald-200 shadow-emerald-500/25",
  rose: "from-rose-500/40 to-orange-400/30 focus-visible:ring-rose-200 shadow-rose-500/25",
  neutral: "from-white/25 to-white/10 focus-visible:ring-white shadow-black/30",
};

const sizeStyles: Record<GlassButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-1.5 rounded-xl",
  md: "h-11 px-6 text-sm sm:text-base gap-2 rounded-2xl",
  lg: "h-14 px-8 text-base sm:text-lg gap-2.5 rounded-2xl",
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Spinner() {
  return (
    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Frosted-glass button with a tinted glow, a light sweep on hover,
 * a pressed state, a visible focus ring, and loading / disabled states.
 * Works best on a colourful or image background.
 */
export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(function GlassButton(
  {
    tint = "violet",
    size = "md",
    loading = false,
    loadingLabel = "Loading",
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    className,
    children,
    type = "button",
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cx(
        "group relative isolate inline-flex select-none items-center justify-center overflow-hidden font-semibold text-white",
        "border border-white/25 bg-white/10 bg-gradient-to-br backdrop-blur-xl shadow-lg",
        "[text-shadow:0_1px_2px_rgb(0_0_0/0.35)]",
        "transition-all duration-300 ease-out motion-reduce:transition-none",
        "hover:-translate-y-0.5 hover:border-white/40 hover:shadow-xl",
        "active:translate-y-0 active:scale-[0.97] active:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        "disabled:pointer-events-none disabled:opacity-50 disabled:saturate-50",
        tintStyles[tint],
        sizeStyles[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {/* top highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-white/30 to-transparent"
      />
      {/* light sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 -z-10 w-1/3 -skew-x-12 bg-white/30 blur-md opacity-0 transition-all duration-700 ease-out group-hover:left-[120%] group-hover:opacity-100 motion-reduce:hidden"
      />

      {loading ? <Spinner /> : leftIcon}
      <span className={cx(loading && "opacity-80")}>{children}</span>
      {!loading && rightIcon}
      {loading && <span className="sr-only">{loadingLabel}</span>}
    </button>
  );
});
