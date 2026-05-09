import { dictionaries, DEFAULT_LOCALE, type Locale } from "./config";

type DotPath<T, P extends string = ""> = {
  [K in keyof T & string]: T[K] extends object
    ? DotPath<T[K], `${P}${K}.`>
    : `${P}${K}`;
}[keyof T & string];

export type TranslationKey = DotPath<typeof dictionaries.pl>;

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown);
}

export function translate(
  locale: Locale,
  key: TranslationKey,
  vars?: Record<string, string | number>,
): string {
  const dict =
    locale in dictionaries ? dictionaries[locale as keyof typeof dictionaries] : dictionaries[DEFAULT_LOCALE];
  const raw = getNestedValue(dict, key);
  if (typeof raw !== "string") return key;
  let value = raw;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      value = value.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
  }
  return value;
}
