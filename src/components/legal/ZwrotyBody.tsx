import { COMPANY, LEGAL_EFFECTIVE_LABEL, returnsAddressMultiline } from "@/lib/legal/company";

/** Treść przygotowana na bazie dokumentu „Zwroty i odstąpienie” — adres i dane spółki wg `company.ts`. */
export function ZwrotyBody() {
  const adres = returnsAddressMultiline();

  return (
    <>
      <p className="uppercase tracking-wide text-neutral-600">{COMPANY.tradingName}</p>
      <p>
        <strong>Sklep:</strong> clth.pl
        <br />
        <strong>Obowiązuje od:</strong> {LEGAL_EFFECTIVE_LABEL}
      </p>

      <h2 className="legal-h2">1. Zwrot 14 dni</h2>
      <p>
        Klient będący Konsumentem albo Przedsiębiorcą na prawach konsumenta może odstąpić od umowy w terminie 14 dni bez
        podania przyczyny.
      </p>

      <h2 className="legal-h2">2. Od kiedy liczy się termin</h2>
      <p>
        Termin liczy się od dnia otrzymania Produktu przez Klienta lub osobę wskazaną przez Klienta inną niż przewoźnik.
      </p>

      <h2 className="legal-h2">3. Jak zgłosić zwrot</h2>
      <p>
        Napisz na{" "}
        <a href={`mailto:${COMPANY.returnsEmail}`} className="font-semibold underline">
          {COMPANY.returnsEmail}
        </a>
        , podaj numer zamówienia, imię i nazwisko oraz informację, które Produkty zwracasz. Możesz użyć wzoru
        formularza odstąpienia z{" "}
        <a href="/regulamin#formularz-odstapienia" className="underline">
          Regulaminu
        </a>
        ; nie jest on jednak obligatoryjny, jeżeli swoje stanowisko przekażesz jednoznacznie mailowo lub listowo przed upływem
        terminu.
      </p>

      <h2 className="legal-h2">4. Adres zwrotu</h2>
      <div className="rounded border border-neutral-200 bg-neutral-50 px-4 py-3">
        <p className="font-semibold">{COMPANY.fullLegalName}</p>
        <p className="whitespace-pre-line">{adres}</p>
        <p>Tel. do zwrotu: {COMPANY.returnsPhone}</p>
      </div>
      <p className="mt-3">
        Przed wysyłką upewnij się przy otrzymanej wiadomości zwrotnej, że adres jest nadal aktualny.
      </p>

      <h2 className="legal-h2">5. Termin odesłania Produktu</h2>
      <p>Odeślij Produkt jak najwcześniej, nie później jednak niż 14 dni od dnia, w którym poinformowałeś o odstąpieniu od umowy.</p>

      <h2 className="legal-h2">6. Koszt zwrotu</h2>
      <p>Koszt odesłania Produktów do Sprzedawcy ponosi Klient, jeśli komunikat promocyjny lub indywidualna korespondencja nie stanowi inaczej.</p>

      <h2 className="legal-h2">7. Stan zwracanego Produktu</h2>
      <p>
        Produkt powinien być kompletny oraz pozbawiony śladów użytkowania wykraczających ponad sprawdzenie charakteru, cech
        i funkcjonowania Produktu. Można go przymierzyć jak w zwyczajnym sklepie stacjonarnym — za pogorszenie stanu przy
        naruszeniu dobrych praktyk odpowiedzialny jest Kupujący.
      </p>

      <h2 className="legal-h2">8. Zwrot pieniędzy</h2>
      <p>
        Środki zwrócimy najpóźniej w terminie wskazanym przepisami o prawach konsumenta, przy czym zwrot środków możemy
        wstrzymać do momentu ponownego otrzymania Produktów albo dostarczenia dowodu ich odesłania — według tego, co
        nastąpi wcześniej zgodnie z ustawą.
      </p>

      <h2 className="legal-h2">9. Metoda zwrotu środków</h2>
      <p>
        Zwrot zostanie wykonany tą samą metodą płatności, której użyłeś przy zamówieniu, jeśli wyraźnie nie uzgodnimy z
        Tobą czegoś innego.
      </p>

      <h2 className="legal-h2">10. Produkty personalizowane</h2>
      <p>
        Prawo odstąpienia może nie przysługiwać, jeżeli Produkt został wykonany według indywidualnej specyfikacji
        Klienta. Standardowy asortyment dobierany wyłącznie spośród gotowych wzorów rozmiaru i koloru zwykle korzysta z
        prawa odstąpienia jak wyżej, o ile konkretnie przy Produkcie nie wskazano inaczej.
      </p>
    </>
  );
}
