/** Stałe adresowe i rejestrowe Sprzedawcy (CLTH.PL / MMN) — dopasuj zwroty/przesyłki, jeśli magazyn ma inny adres. */
export const COMPANY = {
  tradingName: "CLTH.PL",
  shopUrl: "https://clth.pl",
  fullLegalName: "MMN spółka z ograniczoną odpowiedzialnością",
  headquartersLine1: "ul. Lwowska 154A",
  headquartersLine2: "33-300 Nowy Sącz",
  returnsAddressSameAsHQ: true,
  nip: "7343667747",
  krs: "0001225651",
  regon: "544051855",
  shareCapitalPln: "5 000 zł",
  email: "kontakt.clth.pl@gmail.com",
  returnsEmail: "kontakt.clth.pl@gmail.com",
  complaintsEmail: "kontakt.clth.pl@gmail.com",
} as const;

export const LEGAL_EFFECTIVE_LABEL = "8 maja 2026 r.";

export function companyAddressMultiline(): string {
  return `${COMPANY.headquartersLine1}\n${COMPANY.headquartersLine2}`;
}
