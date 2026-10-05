"use client";

import { useState } from "react";

export interface CodeBlockProps {
  code: string;
  title?: string;
  /** Collapse long code behind a "Show all" button */
  maxHeight?: boolean;
}

export function CodeBlock({ code, title, maxHeight = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(!maxHeight);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs">
        <span className="font-mono text-slate-400">{title}</span>
        <button
          type="button"
          onClick={copy}
          className="rounded-md px-2 py-1 text-slate-300 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <span aria-live="polite">{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <div className="relative">
        <pre className={`overflow-x-auto p-4 text-[13px] leading-relaxed text-slate-200 ${expanded ? "" : "max-h-80 overflow-y-hidden"}`}>
          <code>{code}</code>
        </pre>
        {!expanded && (
          <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-slate-900 pb-4 pt-16">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              Show full source
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
