import type { ReactNode } from "react";

/** Wspólna ramka dokumentów regulaminowych (PL). */
export function LegalArticle({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-[740px] bg-white px-6 py-12 md:px-8 md:py-16">
      {eyebrow ? (
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--unmade-accent)]">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-4 text-2xl font-bold uppercase tracking-[0.12em] text-neutral-900 md:text-3xl">
        {title}
      </h1>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-neutral-800 [&_.legal-h2]:mt-10 [&_.legal-h2]:border-b [&_.legal-h2]:border-neutral-200 [&_.legal-h2]:pb-2 [&_.legal-h2]:text-base [&_.legal-h2]:font-bold [&_.legal-h2]:text-neutral-950 [&_.legal-h3]:mt-6 [&_.legal-h3]:text-sm [&_.legal-h3]:font-semibold [&_.legal-h3]:text-neutral-900 [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:leading-relaxed [&_strong]:font-semibold [&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </div>
    </article>
  );
}
