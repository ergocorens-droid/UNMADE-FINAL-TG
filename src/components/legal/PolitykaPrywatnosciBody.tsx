import { COMPANY, LEGAL_EFFECTIVE_LABEL, companyAddressMultiline } from "@/lib/legal/company";

export function PolitykaPrywatnosciBody() {
  const addr = companyAddressMultiline();
  return (
    <>
      <p className="uppercase tracking-wide text-neutral-600">
        {COMPANY.tradingName} / {COMPANY.shopUrl.replace("https://", "")}
      </p>
      <p>
        <strong>Obowiązuje od:</strong> {LEGAL_EFFECTIVE_LABEL}
        <br />
        <strong>Sklep:</strong> {COMPANY.shopUrl.replace("https://", "")}
        <br />
        <strong>Administrator:</strong> {COMPANY.fullLegalName}
      </p>

      <h2 className="legal-h2">1. Administrator danych</h2>
      <p>
        Administratorem danych osobowych jest {COMPANY.fullLegalName} z siedzibą przy{" "}
        <span className="whitespace-pre-line">{addr}</span>, NIP {COMPANY.nip}, KRS {COMPANY.krs}, REGON{" "}
        {COMPANY.regon}, e-mail:{" "}
        <a href={`mailto:${COMPANY.email}`} className="underline">
          {COMPANY.email}
        </a>
        .
      </p>

      <h2 className="legal-h2">2. Jakie dane przetwarzamy</h2>
      <p>Możemy przetwarzać w szczególności:</p>
      <ul>
        <li>imię i nazwisko,</li>
        <li>adres dostawy,</li>
        <li>adres e-mail,</li>
        <li>numer telefonu,</li>
        <li>dane do faktury,</li>
        <li>dane niezbędne do obsługi transakcji przekazywane operatorowi płatności przy checkout,</li>
        <li>numer zamówienia i historię zamówień,</li>
        <li>adres IP i identyfikatory cookies,</li>
        <li>dane związane z korzystaniem ze Sklepu.</li>
      </ul>

      <h2 className="legal-h2">3. Cele i podstawy przetwarzania</h2>
      <p>Dane przetwarzamy w celu:</p>
      <ul>
        <li>realizacji zamówienia i umowy sprzedaży,</li>
        <li>obsługi płatności i dostawy,</li>
        <li>wystawiania dokumentów księgowych i prowadzenia rozliczeń,</li>
        <li>obsługi zwrotów i reklamacji,</li>
        <li>kontaktu z Klientem,</li>
        <li>zabezpieczenia lub dochodzenia roszczeń,</li>
        <li>analityki Sklepu,</li>
        <li>marketingu, jeżeli Klient wyraził zgodę lub inna podstawa prawna to umożliwia.</li>
      </ul>

      <h2 className="legal-h2">4. Odbiorcy danych</h2>
      <p>
        Dane mogą być przekazywane podmiotom wspierającym działanie Sklepu, w szczególności: dostawcy platformy
        e-commerce (Shopify), operatorom płatności, firmom kurierskim i logistyce, biuru rachunkowemu, dostawcom hostingu,
        narzędziom analitycznym i marketingowym (jeśli są wdrożone) oraz podmiotom uprawnionym na podstawie prawa.
      </p>

      <h2 className="legal-h2">5. Płatności</h2>
      <p>
        Płatności obsługiwane są przez operatora wskazanego w procesie zakupu Shopify. Operator przetwarza dane zgodnie z
        własnym regulaminem oraz wymaganiami bezpieczeństwa.
      </p>

      <h2 className="legal-h2">6. Dostawa</h2>
      <p>
        W celu doręczenia zamówienia przekazujemy niezbędne dane firmie kurierskiej, operatorowi paczkomatów lub innemu
        przewoźnikowi wybranemu przez Klienta.
      </p>

      <h2 className="legal-h2">7. Marketing i media społecznościowe</h2>
      <p>
        Jeżeli wdrożono narzędzia takie jak Meta Pixel, TikTok Pixel, Google Analytics lub Google Ads, dane mogą być
        przetwarzane zgodnie z konfiguracją zgody cookies oraz politykami dostawców tych rozwiązań.
      </p>

      <h2 className="legal-h2">8. Czas przechowywania</h2>
      <p>
        Dane przechowujemy przez czas realizacji zamówienia oraz okres niezbędny do spełnienia obowiązków prawnych
        (m.in. podatkowych i rachunkowych), rozpatrywania reklamacji i obrony lub dochodzenia roszczeń. Dane
        przetwarzane na podstawie zgody chronimy do momentu jej cofnięcia, jeśli brak jest innych podstaw.
      </p>

      <h2 className="legal-h2">9. Prawa Klienta</h2>
      <ul>
        <li>dostęp do danych, ich sprostowanie, usunięcie, ograniczenie przetwarzenia,</li>
        <li>sprzeciw oraz przenoszenie danych (tam, gdzie ma to zastosowanie),</li>
        <li>cofnięcie zgody,</li>
        <li>prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.</li>
      </ul>
      <p>
        Pisz na adres{" "}
        <a href={`mailto:${COMPANY.email}`} className="underline">
          {COMPANY.email}
        </a>
        .
      </p>

      <h2 className="legal-h2">10. Dobrowolność</h2>
      <p>
        Podanie danych jest dobrowolne, jednak bez niektórych informacji zakup lub dostawa może być niemożliwy.
      </p>

      <h2 className="legal-h2">11. Przekazywanie danych poza EOG</h2>
      <p>
        Niektóre integracje mogą wiązać się z przekazywaniem poza UE. Stosujemy mechanizmy przewidziane przez prawo UE,
        aby zapewnić odpowiedni poziom ochrony.
      </p>

      <h2 className="legal-h2">12. Bezpieczeństwo</h2>
      <p>
        Wykorzystujemy rozwiązania techniczne i organizacyjne mające na celu ochronę przed nieuprawnionym dostępem,
        utratą lub nieuprawnioną zmianą danych osobowych.
      </p>

      <h2 className="legal-h2">13. Aktualizacje</h2>
      <p>Treść dokumentu możemy zmieniać przy rozwoju Sklepu lub zmianie przepisów. Obowiązuje udostępniona w Sklepie wersja z aktualnym oznaczeniem daty powyżej.</p>
    </>
  );
}
