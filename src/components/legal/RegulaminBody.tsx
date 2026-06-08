import { COMPANY, LEGAL_EFFECTIVE_LABEL, companyAddressMultiline } from "@/lib/legal/company";

const addrHQ = () => companyAddressMultiline();

export function RegulaminBody() {
  return (
    <>
      <p>
        Obowiązuje od: <strong>{LEGAL_EFFECTIVE_LABEL}</strong>
        <br />
        Sklep: {COMPANY.shopUrl.replace("https://", "")}
        <br />
        Sprzedawca: {COMPANY.fullLegalName}
      </p>

      <h2 className="legal-h2">§ 1. Dane Sprzedawcy</h2>
      <ol>
        <li>
          Sklep internetowy {COMPANY.tradingName}, dostępny pod adresem{" "}
          <a href={COMPANY.shopUrl} className="underline">
            clth.pl
          </a>
          , prowadzony jest przez {COMPANY.fullLegalName}.
        </li>
        <li>Dane Sprzedawcy:</li>
      </ol>
      <ul>
        <li>firma: {COMPANY.fullLegalName}</li>
        <li className="whitespace-pre-line">adres siedziby: {addrHQ()}</li>
        <li>NIP: {COMPANY.nip}</li>
        <li>KRS: {COMPANY.krs}</li>
        <li>REGON: {COMPANY.regon}</li>
        <li>kapitał zakładowy: {COMPANY.shareCapitalPln}</li>
        <li>
          e-mail kontaktowy:{" "}
          <a href={`mailto:${COMPANY.email}`} className="underline">
            {COMPANY.email}
          </a>
        </li>
      </ul>
      <ol start={3}>
        <li>
          Kontakt ze Sprzedawcą odbywa się przede wszystkim pocztą elektroniczną na adres{" "}
          <a href={`mailto:${COMPANY.email}`} className="underline">
            {COMPANY.email}
          </a>
          .
        </li>
      </ol>

      <h2 className="legal-h2">§ 2. Definicje</h2>
      <ol>
        <li>
          <strong>Klient</strong> — osoba fizyczna, osoba prawna albo jednostka organizacyjna dokonująca zakup
          w Sklepie.
        </li>
        <li>
          <strong>Konsument</strong> — osoba fizyczna dokonująca zakupu niezwiązanego bezpośrednio z jej
          działalnością gospodarczą lub zawodową (zgodnie z Kodeksem cywilnym).
        </li>
        <li>
          <strong>Przedsiębiorca na prawach konsumenta</strong> — osoba fizyczna prowadząca działalność
          gospodarczą, gdy zakup nie ma dla niej charakteru zawodowego w rozumieniu przepisów o konsumentach.
        </li>
        <li>
          <strong>Produkt</strong> — rzecz ruchoma oferowana w Sklepie, w szczególności odzież marek
          dostępnych w ofercie.
        </li>
        <li>
          <strong>Zamówienie</strong> — oświadczenie Klienta zmierzające do zawarcia umowy sprzedaży Produktu.
        </li>
      </ol>

      <h2 className="legal-h2">§ 3. Zasady korzystania ze sklepu</h2>
      <ol>
        <li>
          Do korzystania ze Sklepu potrzebne jest urządzenie z dostępem do Internetu, aktualna przeglądarka
          internetowa oraz czynny adres e-mail.
        </li>
        <li>Klient zobowiązany jest podawać prawdziwe dane niezbędne do realizacji Zamówienia.</li>
        <li>
          Zabronione jest dostarczanie treści bezprawnych oraz korzystanie ze Sklepu w sposób sprzeczny z
          obowiązującym prawem lub dobrymi obyczajami.
        </li>
      </ol>

      <h2 className="legal-h2">§ 4. Produkty i ceny</h2>
      <ol>
        <li>
          Ceny Produktów są podane w Sklepie w złotych polskich (PLN) brutto — chyba że przy Produkcie
          wyraźnie wskazano inną prezentację ceny albo dostępną walutę wynikającą z funkcji lub ustawienia przy
          zakupowej części Sklepu (np. wybór rynku).
        </li>
        <li>
          Zwykle koszty dostawy nie są wliczone w cenę Produktu, chyba że opis Produktu lub etap zamówienia w
          Sklepie stanowi inaczej.
        </li>
        <li>
          Informacje o Produkcie, w tym rozmiar, kolor, cenę oraz przewidywany lub orientacyjny czas przygotowania
          zamówienia do wysłania, zamieszczamy na stronie Produktu.
        </li>
        <li>
          Zdjęcia mogą nieznacznie różnić się od realnego wyglądu Produktu, w szczególności w zakresie odcienia
          koloru (ustawienia ekranu, oświetlenie zdjęć).
        </li>
      </ol>

      <h2 className="legal-h2">§ 5. Zamówienia</h2>
      <ol>
        <li>Zamówienia można składać przez Sklep internetowy 24 godziny na dobę, 7 dni w tygodniu.</li>
        <li>
          Aby złożyć zamówienie, Klient wybiera Produkt, ewentualne parametry (np. rozmiar, ilość), dostawę i metodę
          płatności dostępną przy składaniu zamówienia, a następnie dokonuje jego potwierdzenia.
        </li>
        <li>
          Umowa sprzedaży dochodzi do skutku z chwilą przyjęcia przez Sprzedawcę oferty złożonej przez Klienta, w szczególności przez wysłanie Klientowi komunikacji e-mail potwierdzającej przyjęcie zamówienia do realizacji lub nadanie zamówieniu statusu realizacji.
        </li>
        <li>
          Sprzedawca może skontaktować się z Klientem celem doprecyzowania danych lub potwierdzenia szczegółów
          realizacji zamówienia.
        </li>
      </ol>

      <h2 className="legal-h2">§ 6. Płatności</h2>
      <ol>
        <li>Dostępne metody płatności są wskazywane w procesie zakupu (checkout) — zgodnie z integracją sklepu.</li>
        <li>
          W sklepie wykorzystywana jest platforma Shopify oraz operator płatności obsługujący transakcję przez
          bezpieczny formularz płatności po stronie dostawcy płatności. Dostępne metody (np. przelew, BLIK,
          karty płatnicze, cyfrowe portfele) pokazywane są Klientowi przy składaniu zamówienia.
        </li>
        <li>
          Zamówienie realizowane jest po prawidłowym uregulowaniu płatności, chyba że przy danej metodzie lub
          promocji wskazano inaczej (np. pobranie, jeżeli zostanie włączone).
        </li>
        <li>
          Jeżeli płatność nie wpłynie w terminie 3 dni kalendarzowych od złożenia zamówienia, Sprzedawca może
          je anulować po uprzednim powiadomieniu Klienta na podany przy zamówieniu adres e-mail.
        </li>
      </ol>

      <h2 className="legal-h2">§ 7. Dostawa</h2>
      <ol>
        <li>
          Zakres dostawy i szczegóły metod dostaw wskazywane są na etapie składania zamówienia oraz na stronie
          informacyjnej Sklepu.
        </li>
        <li>
          Orientacyjny czas przygotowania przesyłki do nadania dla zamówień realizowanych w Polsce wynosi
          najczęściej następny dzień roboczy po zapłacie, jeśli Produkt lub opis przy zamówieniu nie stanowi
          inaczej.
        </li>
        <li>Czas dostawy po stronie firmy kurierskiej lub operatora automatów nadawczych zależy od przewoźnika.</li>
        <li>Koszty dostawy prezentuje Sklep przy składaniu zamówienia.</li>
        <li>Klient powinien sprawdzić stan przesyłki przy odbiorze. W razie uszkodzeń warto sporządzić protokół u przewoźnika i skontaktować się ze Sklepem.</li>
      </ol>

      <h2 className="legal-h2">§ 8. Odstąpienie od umowy i zwrot 14 dni</h2>
      <ol>
        <li>
          Konsument oraz Przedsiębiorca na prawach konsumenta może odstąpić od umowy sprzedaży w terminie 14 dni bez
          podania przyczyny.
        </li>
        <li>
          Termin 14 dni liczy się od dnia, w którym Klient lub wskazana przez niego osoba trzecia inna niż przewoźnik
          weszła w posiadanie Produktu.
        </li>
        <li>
          Aby skutecznie odstąpić od umowy, Klient powinien poinformować Sprzedawcę przed upływem terminu — można to
          zrobić m.in. wysyłając wiadomość na adres{" "}
          <a href={`mailto:${COMPANY.returnsEmail}`} className="underline">
            {COMPANY.returnsEmail}
          </a>
          .
        </li>
        <li>
          Klient może skorzystać z formularza odstąpienia od umowy stanowiącego część Regulaminu (odnośnik:{" "}
          <strong>„Formularz odstąpienia”</strong>
          ); korzystanie z formularza nie jest jednak obowiązkowe pod warunkiem, że oświadczenie wyraźnie komunikuje
          wolę odstąpienia w terminie.
        </li>
        <li>
          Produkt należy odesłać niezwłocznie — nie później niż 14 dni od dnia złożenia oświadczenia o odstąpieniu —
          na adres zwrotowy:{" "}
          <span className="block whitespace-pre-line font-semibold">{addrHQ()}</span>
        </li>
        <li>Bezpośrednie koszty zwrotnego odesłania Produktu ponosi Klient, chyba że Sprzedawca wyraźnie stanowi inaczej.</li>
        <li>
          Sprzedawca zwraca zapłatę niezwłocznie, najpóźniej jednak zgodnie z terminami ustawowo przewidywanymi dla
          konsumentów (co zasady 14-dniowych), przy czym może wstrzymać zwrot do czasu otrzymania zwrotnego Produktu lub
          do czasu dostarczenia przez Klienta dowodu odesłania — w zależności od tego, co nastąpi wcześniej.
        </li>
        <li>
          Zwrot nastąpi przy użyciu tej samej metody płatności co pierwotna transakcja, chyba że Klient wyrazi zgodę na
          inny sposób i nie będzie to dla niego powiązane z dodatkowymi kosztami.
        </li>
        <li>
          Klient odpowiada za zmniejszenie wartości Produktu wynikające z korzystania z niego w sposób wykraczający poza konieczny do oceny charakteru, właściwości i działania Produktu.
        </li>
      </ol>
      <p>
        Szczegółowe wyjaśnienia znajdziesz też na stronie{" "}
        <a href="/zwroty-i-odstapienie" className="underline">
          Zwroty i odstąpienie od umowy
        </a>
        .
      </p>

      <h2 className="legal-h2">§ 9. Wykonanie Produktów na życzenie (personalizacja)</h2>
      <ol>
        <li>
          Jeżeli Sklep świadczy Produkt przygotowany na indywidualne zamówienie Klienta (np. spersonalizowany nadruk lub
          modyfikacja według zamówionej przez Klienta specyfikacji), prawo odstąpienia może być według przepisów wyłączone lub ograniczone — informacja taka powinna być podana przy zamówieniu.
        </li>
        <li>
          Produkt dostępny z gotowych wzorów rozmiaru i koloru, bez personalizacji, podlega zasadzie odstąpienia z § 8,
          o ile ustawa wyłączenia nie nabierze innego skutku.
        </li>
      </ol>

      <h2 className="legal-h2">§ 10. Reklamacje</h2>
      <ol>
        <li>Z tytułu niezgodności umowy przysługują uprawnienia na zasadach przewidzianych prawem konsumenckim i Kodeksem cywilnym.</li>
        <li>Reklamacje można składać na adres poczty elektronicznej Sprzedawcy:{" "}
          <a href={`mailto:${COMPANY.complaintsEmail}`} className="underline">
            {COMPANY.complaintsEmail}
          </a>
          .
        </li>
        <li>W treści warto zamieścić: numer zamówienia, krótki opis oraz zdjęcie ułatwiające oględziny.</li>
        <li>Odpowiedź udzielimy bez zbędnej zwłoki, nie później jednak niż w terminie 14 dni kalendarzowych od jej otrzymania przez Sprzedawcę.</li>
      </ol>

      <h2 className="legal-h2">§ 11. Dane osobowe</h2>
      <ol>
        <li>Administratorem danych przy realizacji zakupów jest Sprzedawca.</li>
        <li>Zasady przetwarzania są opisane w Polityce prywatności dostępnej na stronie Sklepu.</li>
      </ol>

      <h2 className="legal-h2">§ 12. Opinie</h2>
      <ol>
        <li>W miarę uruchamianych funkcji Sklepu mogą funkcjonować moduły opinii — publikacja powinna być przejrzysta oraz zgodna z dobrymi praktykami.</li>
        <li>Niedozwolone jest publikowanie treści fałszywych lub naruszających obowiązujące prawo oraz dobra osoby trzeciej.</li>
      </ol>

      <h2 className="legal-h2">§ 13. Postanowienia końcowe</h2>
      <ol>
        <li>Regulamin jest udostępniany bez opłaty i w treści pozwalającej na jego pobranie, utrwalenie i wydruk.</li>
        <li>Zmiany Regulaminu mają miejsce w szczególności z uzasadnień technicznych, prawnych lub organizacyjnych — przy składaniu zamówienia obowiązuje wersja przyjęta w chwili zawarcia umowy zakupowej.</li>
        <li>Materiały prawne niewymienione w Regulaminie regulują w pierwszej kolejności ustawy oraz właściwy przepis sądu.</li>
      </ol>
    </>
  );
}
