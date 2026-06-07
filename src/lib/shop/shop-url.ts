/** Buduje query `/sklep` z filtrami i sortem. */
export function buildSklepSearchParams(opts: {
  kolor?: string;
  typ?: string;
  sort?: string;
  q?: string;
}): string {
  const p = new URLSearchParams();
  if (opts.kolor) p.set("kolor", opts.kolor);
  if (opts.typ) p.set("typ", opts.typ);
  if (opts.sort && opts.sort !== "najnowsze") p.set("sort", opts.sort);
  if (opts.q) p.set("q", opts.q);
  return p.toString();
}

export function sklepHref(opts: {
  kolor?: string;
  typ?: string;
  sort?: string;
  q?: string;
}): string {
  const hasOnlyType = opts.typ && !opts.kolor && !opts.q;
  const hasOnlyNeedMoney = opts.q === "Need Money For" && !opts.kolor && !opts.typ;
  const sort = opts.sort && opts.sort !== "najnowsze" ? `?sort=${encodeURIComponent(opts.sort)}` : "";

  if (hasOnlyType && opts.typ === "t-shirts") {
    return `/sklep-t-shirts${sort}`;
  }
  if (hasOnlyType && opts.typ === "blueprint") {
    return `/sklep-bluzy${sort}`;
  }
  if (hasOnlyNeedMoney) {
    return `/sklep-need-money${sort}`;
  }

  const s = buildSklepSearchParams(opts);
  return s ? `/sklep?${s}` : "/sklep";
}
