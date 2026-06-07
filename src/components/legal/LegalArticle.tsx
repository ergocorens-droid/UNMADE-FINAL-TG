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
    <article className="mx-auto max-w-[860px] bg-white px-6 py-16 md:px-8 md:py-24">
      {eyebrow ? (
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-neutral-500">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-4 border-b border-black/[0.06] pb-8 text-4xl font-black uppercase leading-none tracking-normal text-neutral-950 md:text-6xl">
        {title}
      </h1>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-neutral-800 [&_.legal-h2]:mt-10 [&_.legal-h2]:border-b [&_.legal-h2]:border-black/[0.06] [&_.legal-h2]:pb-2 [&_.legal-h2]:text-base [&_.legal-h2]:font-black [&_.legal-h2]:uppercase [&_.legal-h2]:text-neutral-950 [&_.legal-h3]:mt-6 [&_.legal-h3]:text-sm [&_.legal-h3]:font-semibold [&_.legal-h3]:text-neutral-900 [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:leading-relaxed [&_strong]:font-semibold [&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </div>
    </article>
  );
}
