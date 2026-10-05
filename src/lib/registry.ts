export interface ComponentEntry {
  slug: string;
  name: string;
  /** Plain type label used in submissions: button, card, form, ... */
  type: string;
  week: number;
  description: string;
  /** Path to the component source, relative to the project root */
  source: string;
  /** Short usage example shown on the component page */
  usage: string;
  props: Array<{ name: string; type: string; default?: string; description: string }>;
  /** Background behind the live preview */
  previewBg: string;
}

export const components: ComponentEntry[] = [
  {
    slug: "glass-button",
    name: "Glass Button",
    type: "button",
    week: 1,
    description:
      "Frosted-glass button with a tinted glow, a light sweep on hover, a pressed state, a visible focus ring, and loading and disabled states.",
    source: "src/components/ui/GlassButton.tsx",
    previewBg:
      "bg-[radial-gradient(circle_at_20%_20%,#7c3aed_0,transparent_45%),radial-gradient(circle_at_80%_30%,#0891b2_0,transparent_45%),radial-gradient(circle_at_50%_90%,#db2777_0,transparent_50%)] bg-slate-950",
    usage: `import { GlassButton } from "@/components/ui/GlassButton";

<GlassButton tint="violet" size="lg" onClick={save}>
  Get started
</GlassButton>

<GlassButton tint="cyan" loading loadingLabel="Saving">
  Saving
</GlassButton>`,
    props: [
      { name: "tint", type: `"violet" | "cyan" | "emerald" | "rose" | "neutral"`, default: `"violet"`, description: "Glow and focus-ring colour" },
      { name: "size", type: `"sm" | "md" | "lg"`, default: `"md"`, description: "Button size" },
      { name: "loading", type: "boolean", default: "false", description: "Spinner, aria-busy, blocks clicks" },
      { name: "loadingLabel", type: "string", default: `"Loading"`, description: "Screen-reader text while loading" },
      { name: "leftIcon / rightIcon", type: "ReactNode", description: "Icons around the label" },
      { name: "fullWidth", type: "boolean", default: "false", description: "Fill the parent width" },
      { name: "...props", type: "ButtonHTMLAttributes", description: "Any native button prop (disabled, onClick, type...)" },
    ],
  },
  {
    slug: "pricing-card",
    name: "Animated Pricing Card",
    type: "card",
    week: 1,
    description:
      "Pricing plan card whose price counts up or down when it changes, lifts on hover, and gets a rotating gradient border when highlighted.",
    source: "src/components/ui/PricingCard.tsx",
    previewBg: "bg-[radial-gradient(circle_at_50%_0%,#312e81_0,transparent_60%)] bg-slate-950",
    usage: `import { PricingCard } from "@/components/ui/PricingCard";

<PricingCard
  name="Pro"
  description="For growing teams"
  price={billing === "monthly" ? 29 : 23}
  priceNote="billed monthly"
  highlighted
  badge="Most popular"
  features={[
    { label: "Unlimited projects" },
    { label: "Custom domain" },
    { label: "SSO", included: false },
  ]}
  ctaLabel="Upgrade to Pro"
  onSelect={() => checkout("pro")}
/>`,
    props: [
      { name: "name", type: "string", description: "Plan name" },
      { name: "description", type: "string", description: "Line under the plan name" },
      { name: "price", type: "number", description: "Current price; changes are animated" },
      { name: "currency / period", type: "string", default: `"$" / "/month"`, description: "Text around the price" },
      { name: "priceNote", type: "string", description: "Small note under the price" },
      { name: "features", type: "{ label: string; included?: boolean }[]", description: "Feature list; included: false is crossed out" },
      { name: "highlighted", type: "boolean", default: "false", description: "Animated gradient border" },
      { name: "badge", type: "string", description: "Ribbon such as \"Most popular\"" },
      { name: "ctaLabel / onSelect", type: "string / () => void", default: `"Get started"`, description: "Button text and handler" },
      { name: "loading / disabled", type: "boolean", default: "false", description: "Button states" },
    ],
  },
];

export const getComponent = (slug: string) => components.find((c) => c.slug === slug);
