import { cookies } from "next/headers";
import {
  CURRENCIES,
  CURRENCY_COOKIE,
  DEFAULT_CURRENCY,
  type CurrencyCode,
  type CountryCode,
} from "./markets";

export async function getServerCurrency(): Promise<CurrencyCode> {
  const cookieStore = await cookies();
  const value = cookieStore.get(CURRENCY_COOKIE)?.value as CurrencyCode | undefined;
  if (value && value in CURRENCIES) return value;
  return DEFAULT_CURRENCY;
}

export async function getServerCountry(): Promise<CountryCode> {
  const code = await getServerCurrency();
  return CURRENCIES[code].country;
}
