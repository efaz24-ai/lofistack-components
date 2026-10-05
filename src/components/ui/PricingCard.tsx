"use client";

import { useEffect, useRef, useState } from "react";

export interface PricingFeature {
  label: string;
  /** false renders the feature crossed out */
  included?: boolean;
}

export interface PricingCardProps {
  /** Plan name, e.g. "Pro" */
  name: string;
  /** One line under the plan name */
  description?: string;
  /** Current price. Changing it animates the number. */
  price: number;
  /** Currency symbol shown before the price */
  currency?: string;
  /** Text after the price, e.g. "/month" */
  period?: string;
  /** Small note under the price, e.g. "billed yearly" */
  priceNote?: string;
  features: PricingFeature[];
  ctaLabel?: string;
  onSelect?: () => void;
  /** Adds the animated gradient border and stronger emphasis */
  highlighted?: boolean;
  /** Ribbon text such as "Most popular" */
  badge?: string;
  /** Shows a spinner on the button */
  loading?: boolean;
  /** Disables the button, e.g. current plan */
  disabled?: boolean;
  className?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Tweens a number towards `target` with requestAnimationFrame. */
function useAnimatedNumber(target: number, duration = 600) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = fromRef.current;
    if (reduce || from === target) {
      fromRef.current = target;
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const next = from + (target - from) * eased;
      fromRef.current = next;
      setValue(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

function Check({ on }: { on: boolean }) {
  return on ? (
    <svg className="mt-0.5 size-5 shrink-0 text-emerald-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  ) : (
    <svg className="mt-0.5 size-5 shrink-0 text-slate-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M5.3 5.3a1 1 0 0 1 1.4 0L10 8.6l3.3-3.3a1 1 0 1 1 1.4 1.4L11.4 10l3.3 3.3a1 1 0 0 1-1.4 1.4L10 11.4l-3.3 3.3a1 1 0 0 1-1.4-1.4L8.6 10 5.3 6.7a1 1 0 0 1 0-1.4Z" />
    </svg>
  );
}

/**
 * Pricing plan card. The price counts up/down when it changes (e.g. a
 * monthly/yearly toggle), the card lifts on hover, and a highlighted plan
 * gets a slowly rotating conic-gradient border.
 */
export function PricingCard({
  name,
  description,
  price,
  currency = "$",
  period = "/month",
  priceNote,
  features,
  ctaLabel = "Get started",
  onSelect,
  highlighted = false,
  badge,
  loading = false,
  disabled = false,
  className,
}: PricingCardProps) {
  const animated = useAnimatedNumber(price);
  const shown = Number.isInteger(price) ? Math.round(animated) : animated.toFixed(2);
  const titleId = `plan-${name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <article
      aria-labelledby={titleId}
      className={cx(
        "group relative flex w-full max-w-sm flex-col rounded-3xl p-px",
        "transition-transform duration-300 ease-out hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        highlighted ? "shadow-2xl shadow-indigo-500/20" : "shadow-xl shadow-black/20",
        className,
      )}
    >
      {/* border layer */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-3xl">
        {highlighted ? (
          <div className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,#6366f1,#ec4899,#22d3ee,#6366f1)] motion-reduce:animate-none" />
        ) : (
          <div className="absolute inset-0 bg-white/10 transition-colors group-hover:bg-white/20" />
        )}
      </div>

      <div className="relative flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-slate-900 p-6 sm:p-8">
        {badge && (
          <span className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 px-3 py-1 text-xs font-semibold text-white">
            {badge}
          </span>
        )}

        <h3 id={titleId} className="text-lg font-semibold text-white">
          {name}
        </h3>
        {description && <p className="mt-1 pr-20 text-sm text-slate-400">{description}</p>}

        <div className="mt-6 flex items-baseline gap-1">
          <span className="text-2xl font-semibold text-slate-300">{currency}</span>
          <span className="text-5xl font-bold tracking-tight text-white tabular-nums" aria-hidden="true">
            {shown}
          </span>
          <span className="text-sm text-slate-400">{period}</span>
          {/* stable value for screen readers, not the tweening one */}
          <span className="sr-only">
            {currency}
            {price} {period}
          </span>
        </div>
        <p className="mt-1 h-5 text-xs text-slate-500" aria-live="polite">
          {priceNote}
        </p>

        <ul className="mt-6 flex-1 space-y-3 text-sm">
          {features.map((f) => {
            const on = f.included !== false;
            return (
              <li key={f.label} className={cx("flex gap-3", on ? "text-slate-200" : "text-slate-500 line-through")}>
                <Check on={on} />
                <span>
                  {f.label}
                  {!on && <span className="sr-only"> (not included)</span>}
                </span>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={onSelect}
          disabled={disabled || loading}
          aria-busy={loading || undefined}
          className={cx(
            "mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
            "active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
            highlighted
              ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:brightness-110"
              : "bg-white/10 text-white hover:bg-white/20",
          )}
        >
          {loading && (
            <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
              <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
          {loading ? "Processing…" : ctaLabel}
        </button>
      </div>
    </article>
  );
}
