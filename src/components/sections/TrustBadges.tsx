export function TrustBadges() {
  return (
    <section className="border-t border-neutral-200 bg-neutral-100 py-14 lg:py-16">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 md:grid-cols-3 md:gap-8">
        <div className="text-center md:text-left">
          <p className="text-2xl" aria-hidden>
            🌍
          </p>
          <h3 className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-neutral-900">
            WYSYŁKA W CAŁEJ POLSCE
          </h3>
          <p className="mt-2 text-sm text-neutral-600">
            DOSTARCZYMY POD TWOJE DRZWI
          </p>
        </div>
        <div className="text-center md:text-left">
          <p className="text-2xl" aria-hidden>
            📦
          </p>
          <h3 className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-neutral-900">
            DARMOWA DOSTAWA OD 300 ZŁ
          </h3>
          <p className="mt-2 text-sm text-neutral-600">BEZ UKRYTYCH KOSZTÓW</p>
        </div>
        <div className="text-center md:text-left">
          <p className="text-2xl" aria-hidden>
            ↩
          </p>
          <h3 className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-neutral-900">
            14 DNI NA ZWROT
          </h3>
          <p className="mt-2 text-sm text-neutral-600">
            SKONTAKTUJ SIĘ Z NAMI LUB ZWRÓĆ PRZEZ KONTO
          </p>
        </div>
      </div>
    </section>
  );
}
