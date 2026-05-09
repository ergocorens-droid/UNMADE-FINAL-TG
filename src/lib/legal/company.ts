/** Stałe adresowe i rejestrowe Sprzedawcy (UNMADE / MMN) — dopasuj zwroty/przesyłki, jeśli magazyn ma inny adres. */
export const COMPANY = {
  tradingName: "UNMADE",
  shopUrl: "https://unmade.pl",
  fullLegalName: "MMN spółka z ograniczoną odpowiedzialnością",
  headquartersLine1: "ul. Lwowska 154A",
  headquartersLine2: "33-300 Nowy Sącz",
  returnsAddressSameAsHQ: true,
  nip: "7343667747",
  krs: "0001225651",
  regon: "544051855",
  shareCapitalPln: "5 000 zł",
  email: "kontakt@unmade.pl",
  returnsEmail: "zwroty@unmade.pl",
  complaintsEmail: "reklamacje@unmade.pl",
} as const;

export const LEGAL_EFFECTIVE_LABEL = "8 maja 2026 r.";

export function companyAddressMultiline(): string {
  return `${COMPANY.headquartersLine1}\n${COMPANY.headquartersLine2}`;
}
