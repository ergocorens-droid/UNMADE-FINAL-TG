export const COLLECTION_LABELS: Record<
  string,
  { pl: string; type: "color" | "type" }
> = {
  black: { pl: "Czarne", type: "color" },
  white: { pl: "Białe", type: "color" },
  "t-shirts": { pl: "T-Shirty", type: "type" },
  hoodies: { pl: "Bluzy", type: "type" },
  bluzy: { pl: "Bluzy", type: "type" },
  blueprint: { pl: "Blueprint", type: "type" },
};

export const SIDEBAR_COLLECTION_HANDLES = Object.keys(COLLECTION_LABELS);
