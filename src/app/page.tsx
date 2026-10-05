import Link from "next/link";
import { components } from "@/lib/registry";

export default function Home() {
  return (
    <>
      <section className="max-w-2xl">
        <p className="text-sm font-medium text-indigo-400">90 Day Build Challenge</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">Component Gallery</h1>
        <p className="mt-4 text-slate-400 sm:text-lg">
          Reusable, accessible React components built with TypeScript and Tailwind CSS. Two new ones every week.
        </p>
      </section>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {components.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/components/${c.slug}/`}
              className="group block h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-indigo-400/50 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="rounded-full bg-indigo-500/15 px-2.5 py-1 font-medium text-indigo-300">{c.type}</span>
                <span className="text-slate-500">Week {String(c.week).padStart(2, "0")}</span>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-white group-hover:text-indigo-300">{c.name}</h2>
              <p className="mt-2 text-sm text-slate-400">{c.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
