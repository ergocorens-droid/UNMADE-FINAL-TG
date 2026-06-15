export const COLLECTION_LABELS: Record<
  string,
  { pl: string; en: string; type: "color" | "type" | "collection" }
> = {
  black: { pl: "Czarne", en: "Black", type: "color" },
  white: { pl: "Białe", en: "White", type: "color" },
  "t-shirts": { pl: "T-Shirty", en: "T-Shirts", type: "type" },
  bluzy: { pl: "Bluzy", en: "Hoodies", type: "type" },
  "baseball-cap": { pl: "Czapki", en: "Caps", type: "type" },
  cytaty: { pl: "Cytaty", en: "Quotes", type: "collection" },
};

export const SIDEBAR_COLLECTION_HANDLES = Object.keys(COLLECTION_LABELS);
