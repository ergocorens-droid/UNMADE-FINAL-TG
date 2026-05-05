import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wysyłka",
  description:
    "Wysyłka UNMADE — darmowa od 300 zł, InPost, DPD, czas dostawy i koszty.",
};

export default function WysylkaPage() {
  return (
    <div className="bg-white pb-24 pt-12 md:pt-16">
      <div className="mx-auto max-w-[720px] px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--unmade-accent)]">
          🔥 Darmowa dostawa od 300 zł
        </p>
        <h1 className="mt-4 text-3xl font-bold uppercase tracking-[0.15em] text-neutral-900">
          WYSYŁKA
        </h1>
        <ul className="mt-10 space-y-6 text-sm leading-relaxed text-neutral-700">
          <li>Darmowa wysyłka od 300 zł</li>
          <li>Wysyłka w 24h po złożeniu zamówienia</li>
          <li>Czas dostawy: 2–4 dni robocze (Polska)</li>
          <li>Kurier: InPost / DPD</li>
          <li>Paczkomaty InPost dostępne</li>
          <li>Koszt wysyłki poniżej 300 zł: 14,99 zł</li>
          <li>
            Wysyłka międzynarodowa: na zapytanie (
            <a href="mailto:kontakt@unmade.pl" className="text-neutral-900 underline">
              kontakt@unmade.pl
            </a>
            )
          </li>
        </ul>
      </div>
    </div>
  );
}
