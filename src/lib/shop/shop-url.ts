/** Buduje query `/sklep` z filtrami i sortem. */
export function buildSklepSearchParams(opts: {
  kolor?: string;
  typ?: string;
  kolekcja?: string;
  sort?: string;
  q?: string;
}): string {
  const p = new URLSearchParams();
  if (opts.kolor) p.set("kolor", opts.kolor);
  if (opts.typ) p.set("typ", opts.typ);
  if (opts.kolekcja) p.set("kolekcja", opts.kolekcja);
  if (opts.sort && opts.sort !== "najnowsze") p.set("sort", opts.sort);
  if (opts.q) p.set("q", opts.q);
  return p.toString();
}

export function sklepHref(opts: {
  kolor?: string;
  typ?: string;
  kolekcja?: string;
  sort?: string;
  q?: string;
}): string {
  const hasOnlyType = opts.typ && !opts.kolor && !opts.kolekcja && !opts.q;
  const isTshirtOrUnset = !opts.typ || opts.typ === "t-shirts";
  const hasNeedMoney =
    (opts.q === "Need Money For" || opts.kolekcja === "need-money-for") &&
    !opts.kolor &&
    isTshirtOrUnset;
  const hasQuotes =
    opts.kolekcja === "cytaty" &&
    !opts.kolor &&
    isTshirtOrUnset &&
    !opts.q;
  const sort = opts.sort && opts.sort !== "najnowsze" ? `?sort=${encodeURIComponent(opts.sort)}` : "";

  if (hasOnlyType && opts.typ === "t-shirts") {
    return `/sklep-t-shirts${sort}`;
  }
  if (
    hasOnlyType &&
    opts.typ &&
    ["bluzy", "hoodies", "blueprint"].includes(opts.typ)
  ) {
    return `/sklep-bluzy${sort}`;
  }
  if (hasNeedMoney) {
    return `/sklep-need-money${sort}`;
  }
  if (hasQuotes) {
    return `/sklep-cytaty${sort}`;
  }

  const s = buildSklepSearchParams(opts);
  return s ? `/sklep?${s}` : "/sklep";
}
