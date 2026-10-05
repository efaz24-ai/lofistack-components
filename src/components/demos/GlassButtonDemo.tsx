"use client";

import { useState } from "react";
import { GlassButton } from "@/components/ui/GlassButton";

const Arrow = () => (
  <svg className="size-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M3 10a1 1 0 0 1 1-1h9.6l-3.3-3.3a1 1 0 1 1 1.4-1.4l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4l3.3-3.3H4a1 1 0 0 1-1-1Z" clipRule="evenodd" />
  </svg>
);

export default function GlassButtonDemo() {
  const [loading, setLoading] = useState(false);

  const fakeSave = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <GlassButton tint="violet" rightIcon={<Arrow />}>Get started</GlassButton>
        <GlassButton tint="cyan">Explore</GlassButton>
        <GlassButton tint="emerald">Confirm</GlassButton>
        <GlassButton tint="rose">Delete</GlassButton>
        <GlassButton tint="neutral">Cancel</GlassButton>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <GlassButton size="sm">Small</GlassButton>
        <GlassButton size="md">Medium</GlassButton>
        <GlassButton size="lg">Large</GlassButton>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <GlassButton tint="cyan" loading={loading} loadingLabel="Saving" onClick={fakeSave}>
          {loading ? "Saving" : "Click to load"}
        </GlassButton>
        <GlassButton disabled>Disabled</GlassButton>
      </div>

      <div className="w-full max-w-xs">
        <GlassButton fullWidth tint="emerald" size="lg">Full width</GlassButton>
      </div>
    </div>
  );
}
