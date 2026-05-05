import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nas | UNMADE — Born From Car Culture",
  description:
    "UNMADE — streetwear z duszą car culture. Poznaj naszą historię, filozofię i dlaczego robimy to co robimy.",
  openGraph: {
    title: "O nas | UNMADE — Born From Car Culture",
    url: "https://unmade.pl/o-nas",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white pb-24 pt-12 md:pt-16">
      <div className="mx-auto max-w-[720px] px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--unmade-accent)]">
          🔥 Nowy drop w drodze
        </p>
        <h1 className="mt-4 text-3xl font-bold uppercase tracking-[0.15em] text-neutral-900">
          O NAS
        </h1>
        <p className="mt-8 text-sm leading-relaxed text-neutral-700">
          UNMADE to streetwear z sercem car culture — grafiki aut, nocne przejazdy
          i limitowane serie. Łączymy jakość materiałów z energią motoryzacji.
        </p>
        <p className="mt-6 text-sm leading-relaxed text-neutral-500">
          {/* TODO: Rozbuduj treść marki */}
          Ta strona to front-end demo — treść „O nas” możesz tu rozwinąć pod SEO i markę.
        </p>
      </div>
    </div>
  );
}
