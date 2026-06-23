import { COMPANY, returnsAddressMultiline } from "@/lib/legal/company";

export function WithdrawalFormAppendix() {
  const addr = returnsAddressMultiline();
  return (
    <section className="scroll-mt-24 border border-neutral-300 bg-neutral-50 p-6 md:p-8" id="formularz-odstapienia">
      <h2 className="text-lg font-bold uppercase tracking-[0.1em] text-neutral-950">FORMULARZ ODSTĄPIENIA OD UMOWY</h2>
      <p className="mt-2 text-neutral-700">
        Formularz można wykorzystać przy zwrocie — jego użycie nie jest obowiązkowe.
      </p>
      <div className="mt-6 space-y-4 rounded border border-dashed border-neutral-400 bg-white p-4 text-sm md:p-6">
        <div>
          <p className="font-semibold text-neutral-900">Adresat</p>
          <p>{COMPANY.fullLegalName}</p>
          <p className="whitespace-pre-line">{addr}</p>
          <p>Tel. do zwrotu: {COMPANY.returnsPhone}</p>
          <p>
            E-mail:{" "}
            <a href={`mailto:${COMPANY.returnsEmail}`} className="underline">
              {COMPANY.returnsEmail}
            </a>
          </p>
        </div>
        <p className="font-semibold text-neutral-900">Oświadczenie</p>
        <p>
          Ja, niżej podpisany/a, informuję o moim odstąpieniu od umowy sprzedaży następującego
          Produktu / następujących Produktów:
        </p>
        <ul className="space-y-2">
          <li>Numer zamówienia: .....................................................</li>
          <li>Data zamówienia: .....................................................</li>
          <li>Data otrzymania Produktu: ............................................</li>
          <li>Zwracane Produkt(y): ..................................................</li>
          <li>Imię i nazwisko: .......................................................</li>
          <li>Adres Klienta: .........................................................</li>
          <li>Adres e-mail: ..........................................................</li>
          <li>Numer telefonu (opcjonalnie): .........................................</li>
        </ul>
        <div>
          <p className="font-semibold text-neutral-900">Zwrot zapłaty</p>
          <p>
            Proszę o zwrot zapłaty na pierwotną metodę płatności. Jeżeli uzgodnimy inną metodę —
            dopisz uzgodnione dane tutaj:
          </p>
          <p className="mt-2 border-b border-neutral-400 pb-8">……………………………………………………………………………………</p>
        </div>
        <div>
          <p className="font-semibold text-neutral-900">Podpis / data</p>
          <p>Data: .....................................................</p>
          <p className="mt-2">
            Podpis Klienta (jeżeli formularz przesyłany w formie papierowej):
            ……………………………………………………………………
          </p>
        </div>
      </div>
      <p className="mt-4 text-xs text-neutral-600">
        Kopię oświadczenia możesz wysłać także e-mailem na adres {COMPANY.returnsEmail}.
      </p>
    </section>
  );
}
