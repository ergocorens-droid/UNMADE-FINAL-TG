import { COMPANY, LEGAL_EFFECTIVE_LABEL, companyAddressMultiline } from "@/lib/legal/company";

export function PolitykaCookiesBody() {
  const addr = companyAddressMultiline();
  return (
    <>
      <p className="uppercase tracking-wide text-neutral-600">{COMPANY.tradingName}</p>
      <p>
        <strong>Sklep:</strong> {COMPANY.shopUrl.replace("https://", "")}
        <br />
        <strong>Obowiązuje od:</strong> {LEGAL_EFFECTIVE_LABEL}
      </p>

      <h2 className="legal-h2">1. Czym są pliki cookies</h2>
      <p>
        Cookies to niewielkie pliki zapisywane na urządzeniu użytkownika podczas korzystania ze strony. Mogą służyć do
        prawidłowego działania Sklepu, analityki, zapamiętywania ustawień oraz — po spełnieniu warunków prawnych lub
        udzieleniu dobrowolnej zgody — działań marketingowych.
      </p>

      <h2 className="legal-h2">2. Rodzaje cookies</h2>
      <p>Sklep może korzystać m.in. z cookies niezbędnych, funkcjonalnych, analitycznych i marketingowych:</p>
      <ul>
        <li>
          <strong>Niezbędne</strong> są wymagane do funkcji koszyka, realizacji zakupów i zabezpieczenia komunikacji.
        </li>
        <li>
          <strong>Funkcjonalne</strong> ułatwiają dopasowanie podstawowych preferencji.
        </li>
        <li>
          <strong>Analityczne</strong> pozwalają mierzyć ruch oraz skuteczność komunikacji.
        </li>
        <li>
          <strong>Marketingowe</strong> są używane tam, gdzie są uruchamiane kampanie pomiarowe lub remarketing — z uwzględnieniem wymogu zgód, jeżeli ma to zastosowanie.
        </li>
      </ul>

      <h2 className="legal-h2">3. Cookies niezbędne</h2>
      <p>
        Umożliwiają przejście procesu zakupowego oraz utrzymanie podstawowego funkcjonowania Sklepu, w tym bezpieczeństwa
        i komunikacji z operatorem płatności przy checkout przez Shopify lub równoważne rozwiązanie.
      </p>

      <h2 className="legal-h2">4. Cookies analityczne</h2>
      <p>
        Pomagają mierzyć ruch na stronie, popularność produktów i skuteczność działań. Można uruchomić np. narzędzie
        przy spełnieniu odpowiedniego komunikatu o cookies oraz uzyskanych zgód tam, gdzie są one wymagane.
      </p>

      <h2 className="legal-h2">5. Cookies marketingowe</h2>
      <p>
        Służyć mogą remarketingowi oraz mierzeniu skuteczności kampanii w Meta Ads, TikTok Ads lub Google Ads — przy
        spełnieniu przepisów prawa oraz zasad konkretnego operatora kampanii reklamowej.
      </p>

      <h2 className="legal-h2">6. Zarządzanie zgodami</h2>
      <p>
        Przy pierwszym wejściu użytkownik powinien mieć możliwość akceptacji, odrzucenia albo konfiguracji cookies innych
        niż niezbędne. Preferencje należy móc cofnąć lub zmienić, jeśli Sklep udostępnia panel ustawień cookies lub baner
        zarządzający klasami narzędzi.
      </p>

      <h2 className="legal-h2">7. Ustawienia przeglądarki</h2>
      <p>Użytkownik może zarządzać plikami także w ustawieniach przeglądarki internetowej.</p>

      <h2 className="legal-h2">8. Dane administratora oraz kontakt</h2>
      <p>
        O przetwarzaniu ściśle związanym z cookies informuje dokument{" "}
        <a href="/polityka-prywatnosci" className="underline">
          Polityka prywatności
        </a>
        . Administratorem danych przy kontroli Sklepu jest {COMPANY.fullLegalName} z siedzibą przy{" "}
        <span className="whitespace-pre-line">{addr}</span>. Kontakt:{" "}
        <a href={`mailto:${COMPANY.email}`} className="underline">
          {COMPANY.email}
        </a>
        .
      </p>

      <h2 className="legal-h2">9. Aktualizacje</h2>
      <p>Polityka cookies może być aktualizowana w miarę zmiany technologii Sklepu oraz przepisów.</p>
    </>
  );
}
