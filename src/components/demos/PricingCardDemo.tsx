"use client";

import { useState } from "react";
import { PricingCard, type PricingFeature } from "@/components/ui/PricingCard";

type Billing = "monthly" | "yearly";

const plans: Array<{
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  features: PricingFeature[];
  highlighted?: boolean;
  badge?: string;
  cta: string;
}> = [
  {
    name: "Starter",
    description: "For side projects",
    monthly: 9,
    yearly: 7,
    cta: "Start free trial",
    features: [
      { label: "3 projects" },
      { label: "Basic analytics" },
      { label: "Community support" },
      { label: "Custom domain", included: false },
    ],
  },
  {
    name: "Pro",
    description: "For growing teams",
    monthly: 29,
    yearly: 23,
    highlighted: true,
    badge: "Most popular",
    cta: "Upgrade to Pro",
    features: [
      { label: "Unlimited projects" },
      { label: "Advanced analytics" },
      { label: "Priority support" },
      { label: "Custom domain" },
    ],
  },
];

export default function PricingCardDemo() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const select = (name: string) => {
    setLoadingPlan(name);
    setTimeout(() => setLoadingPlan(null), 1600);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div role="radiogroup" aria-label="Billing period" className="relative inline-flex rounded-full bg-white/10 p-1 text-sm">
        <span
          aria-hidden="true"
          className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-white transition-transform duration-300 ${billing === "yearly" ? "translate-x-full" : ""}`}
        />
        {(["monthly", "yearly"] as const).map((b) => (
          <button
            key={b}
            role="radio"
            aria-checked={billing === b}
            onClick={() => setBilling(b)}
            className={`relative z-10 w-28 rounded-full py-2 font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 ${billing === b ? "text-slate-900" : "text-slate-300 hover:text-white"}`}
          >
            {b}
            {b === "yearly" && <span className="ml-1 text-xs text-emerald-500">-20%</span>}
          </button>
        ))}
      </div>

      <div className="grid w-full grid-cols-1 justify-items-center gap-6 md:grid-cols-2 md:max-w-3xl">
        {plans.map((p) => (
          <PricingCard
            key={p.name}
            name={p.name}
            description={p.description}
            price={billing === "monthly" ? p.monthly : p.yearly}
            priceNote={billing === "yearly" ? `$${p.yearly * 12} billed yearly` : "billed monthly"}
            features={p.features}
            highlighted={p.highlighted}
            badge={p.badge}
            ctaLabel={p.cta}
            loading={loadingPlan === p.name}
            onSelect={() => select(p.name)}
          />
        ))}
      </div>
    </div>
  );
}
