import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { components, getComponent } from "@/lib/registry";
import { CodeBlock } from "@/components/site/CodeBlock";
import GlassButtonDemo from "@/components/demos/GlassButtonDemo";
import PricingCardDemo from "@/components/demos/PricingCardDemo";

const demos: Record<string, ComponentType> = {
  "glass-button": GlassButtonDemo,
  "pricing-card": PricingCardDemo,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getComponent(slug);
  return c ? { title: c.name, description: c.description } : {};
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getComponent(slug);
  const Demo = demos[slug];
  if (!entry || !Demo) notFound();

  // Read the real component source at build time so the page always shows current code.
  const source = readFileSync(path.join(process.cwd(), entry.source), "utf8");

  return (
    <article>
      <Link href="/" className="text-sm text-slate-400 hover:text-white">
        ← All components
      </Link>

      <header className="mt-4 max-w-3xl">
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-indigo-500/15 px-2.5 py-1 font-medium text-indigo-300">{entry.type}</span>
          <span className="text-slate-500">Week {String(entry.week).padStart(2, "0")}</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{entry.name}</h1>
        <p className="mt-3 text-slate-400">{entry.description}</p>
      </header>

      <section aria-labelledby="preview" className="mt-8">
        <h2 id="preview" className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Live preview</h2>
        <div className={`flex min-h-[22rem] items-center justify-center rounded-3xl border border-white/10 px-4 py-12 sm:px-8 ${entry.previewBg}`}>
          <Demo />
        </div>
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section aria-labelledby="usage">
          <h2 id="usage" className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Usage</h2>
          <CodeBlock code={entry.usage} title="usage.tsx" />
        </section>

        <section aria-labelledby="props">
          <h2 id="props" className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Props</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="bg-white/5 text-xs text-slate-400">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-medium">Prop</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Type</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Default</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {entry.props.map((p) => (
                  <tr key={p.name} className="align-top">
                    <td className="px-4 py-3">
                      <code className="text-indigo-300">{p.name}</code>
                      <p className="mt-1 text-xs text-slate-500">{p.description}</p>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-300">{p.type}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">{p.default ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <section aria-labelledby="source" className="mt-10">
        <h2 id="source" className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Source</h2>
        <CodeBlock code={source} title={entry.source} maxHeight />
      </section>
    </article>
  );
}
