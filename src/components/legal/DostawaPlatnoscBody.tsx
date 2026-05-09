import { COMPANY, LEGAL_EFFECTIVE_LABEL, companyAddressMultiline } from "@/lib/legal/company";

export function DostawaPlatnoscBody() {
  return (
    <>
      <p className="uppercase tracking-wide text-neutral-600">{COMPANY.tradingName}</p>
      <p>
        <strong>Sklep:</strong> unmade.pl
        <br />
        <strong>Obowiązuje od:</strong> {LEGAL_EFFECTIVE_LABEL}
      </p>

      <h2 className="legal-h2">1. Obszar dostawy</h2>
      <p>
        Zamówienia realizujemy na terenie Polski. Ewentualny eksport lub obsługa kolejnych krajów pojawi się przy
        konfiguracji sklepu Shopify i będzie widoczna w koszyku albo w opisie przy wyborze dostawy.
      </p>

      <h2 className="legal-h2">2. Termin nadania</h2>
      <p>
        Standardowo nadajemy przesyłkę kolejnego dnia roboczego po zaksięgowaniu zapłaty za zamówienie, o ile karta Produktu
        lub magazyn nie wskazują dłuższego przygotowania. Dni robocze to poniedziałek – piątek, z pominięciem dni ustawowo
        wolnych od pracy.
      </p>

      <h2 className="legal-h2">3. Czas dostawy przewoźnika</h2>
      <p>
        Po przekazaniu przesyłki dostawcy czas doręczenia zależy od jego sieci i wybranej usługi — zwykle w Polsce wygląda to
        jak 1–4 dni robocze, przy czym opóźnienia po stronie przewoźnika nie obciążają Sprzedawcy, o ile przesyłkę nadał terminowo.
      </p>

      <h2 className="legal-h2">4. Koszt dostawy</h2>
      <p>Koszt dostawy i darmowe progi (np. przy zamówieniach powyżej 300 zł) są widoczne w koszyku przed finalizacją zamówienia.</p>

      <h2 className="legal-h2">5. Metody dostawy</h2>
      <p>
        Dostępne są m.in. dostawy kurierskie oraz odbiór w punktach lub automatach nadawczych według opcji pokazanych przy
        checkout (np. InPost lub DPD oraz inne, jeśli zostaną włączone w panelu).
      </p>

      <h2 className="legal-h2">6. Płatności</h2>
      <p>
        Realizujemy płatności przy użyciu bramki przygotowanej przez Shopify oraz zewnętrznych operatorów płatniczych
        pokazywanych przy składaniu zamówienia. Dostępne metody (przelew internetowy, BLIK, karta, portfele elektroniczne)
        zależą od konfiguracji sklepu oraz operatora płatności.
      </p>

      <h2 className="legal-h2">7. Faktury</h2>
      <p>
        Dane do faktury należy podać przy składaniu zamówienia. Dla przedsiębiorców wymagamy prawidłowego NIP przy fakturze
        VAT oraz innych pól wymaganych prawem.
      </p>

      <h2 className="legal-h2">8. Problemy z płatnością</h2>
      <p>
        W razie kłopotów z płatnością pisz na{" "}
        <a href={`mailto:${COMPANY.email}`} className="underline">
          {COMPANY.email}
        </a>
        . Nie dokonuj dublowanych przelewów bez konsultacji ze Sklepem przy błędzie systemu płatniczego.
      </p>

      <h2 className="legal-h2">9. Dane Sprzedawcy</h2>
      <p>{COMPANY.fullLegalName}</p>
      <p className="whitespace-pre-line">{companyAddressMultiline()}</p>
      <p>NIP {COMPANY.nip} · KRS {COMPANY.krs} · REGON {COMPANY.regon}</p>
    </>
  );
}
