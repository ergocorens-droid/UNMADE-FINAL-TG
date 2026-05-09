import { COMPANY } from "@/lib/legal/company";

/** FAQ przygotowany wg dokumentu do stopki sklepu. */
export function FaqBody() {
  return (
    <>
      <h2 id="wysylka" className="legal-h2 scroll-mt-24">
        FAQ — wysyłka
      </h2>
      <h3 className="legal-h3">Jak szybko wysyłacie zamówienia?</h3>
      <p>
        Zamówienia na terenie Polski nadajemy zwykle następnego dnia roboczego po zaksięgowaniu zapłaty. Czas dostawy po
        stronie kuriera lub operatora automatów nadawczych zależy od przewoźnika.
      </p>

      <h2 id="zwroty" className="legal-h2 scroll-mt-24">
        FAQ — zwroty
      </h2>
      <h3 className="legal-h3">Czy mogę zwrócić produkt?</h3>
      <p>
        Tak — masz co do zasady 14 dni na odstąpienie od umowy jako konsument lub przedsiębiorca na prawach konsumenta bez
        podania przyczyny. Zwrot można zgłosić mailem:{" "}
        <a href={`mailto:${COMPANY.returnsEmail}`} className="underline font-medium">
          {COMPANY.returnsEmail}
        </a>
        . Szczegóły:{" "}
        <a href="/zwroty-i-odstapienie" className="underline">
          Zwroty i odstąpienie od umowy
        </a>
        .
      </p>

      <h2 id="reklamacje" className="legal-h2 scroll-mt-24">
        FAQ — reklamacje
      </h2>
      <h3 className="legal-h3">Co zrobić, jeśli produkt ma wadę?</h3>
      <p>
        Wyślij wiadomość na{" "}
        <a href={`mailto:${COMPANY.complaintsEmail}`} className="underline font-medium">
          {COMPANY.complaintsEmail}
        </a>
        , podaj numer zamówienia, opisz problem i dołącz zdjęcia. Rozpatrzymy sprawę bez zbędnej zwłoki, nie dłużej jednak niż{" "}
        14 dni kalendarzowych od otrzymania wiadomości.
      </p>

      <h2 id="rozmiary" className="legal-h2 scroll-mt-24">
        FAQ — rozmiary
      </h2>
      <h3 className="legal-h3">Jak dobrać rozmiar?</h3>
      <p>
        Najlepiej oprzyj się na tabelach rozmiarów na kartach Produktów w Sklepie. Można też porównać wymiary ze swoją ulubioną koszulką lub bluzą według zmiarkowania przy płasko ułożonym produkcie.
      </p>

      <h2 id="material" className="legal-h2 scroll-mt-24">
        FAQ — materiał
      </h2>
      <h3 className="legal-h3">Z czego są koszulki?</h3>
      <p>
        Niektóre produkty przygotowywamy z przędzy typu miękkiej bawełny 180&nbsp;g/m² — jeśli konkretny model ma inną mieszankę lub gramaturę, znajdziesz to przy opisie na karcie Produktu w Sklepie.
      </p>

      <h2 id="nadruk" className="legal-h2 scroll-mt-24">
        FAQ — nadruk
      </h2>
      <h3 className="legal-h3">Jaki jest nadruk?</h3>
      <p>
        Wykorzystujemy nadruk elastycznego typu (DTF — transfer bezpośredni). Żeby go utrzymać jak najdłużej, pierz
        produkt na lewej stronie, przy niskiej temperaturze, i nie prasuj bezpośrednio na nadruk. Szczegóły mogą się
        różnić — sprawdź też metki na odzieży.
      </p>
    </>
  );
}
