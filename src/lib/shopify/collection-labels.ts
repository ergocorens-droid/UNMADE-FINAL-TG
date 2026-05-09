export const COLLECTION_LABELS: Record<
  string,
  { pl: string; en: string; type: "color" | "type" }
> = {
  black: { pl: "Czarne", en: "Black", type: "color" },
  white: { pl: "Białe", en: "White", type: "color" },
  "t-shirts": { pl: "T-Shirty", en: "T-Shirts", type: "type" },
  hoodies: { pl: "Bluzy", en: "Hoodies", type: "type" },
  bluzy: { pl: "Bluzy", en: "Hoodies", type: "type" },
  blueprint: { pl: "Blueprint", en: "Blueprint", type: "type" },
};

export const SIDEBAR_COLLECTION_HANDLES = Object.keys(COLLECTION_LABELS);
