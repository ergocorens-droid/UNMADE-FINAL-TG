import type { Product } from "@/lib/shopify/types";

const BESTSELLER_HANDLES = [
  "i-have-crazy-girlfriend-tee",
  "i-have-crazy-boyfriend-tee",
  "wanna-be-my-cardio-white-tee",
  "i-want-you-white-tee",
  "always-late-but-worth-the-wait-tee",
  "just-kiss-me-white-tee",
  "i-dont-make-mistakes-tee",
  "i-flitr-as-a-joke-white-tee",
  "im-not-flirting-tee",
  "bad-choices-make-good-stories-black-tee",
  "social-media-is-fake-white-tee-kopia",
  "you-gonna-stare-tee",
  "brake-her-bed-not-her-heart-black-tee",
  "dont-follow-me-white-tee",
  "eat-italian-drive-german-kiss-french-white-tee",
  "im-not-rihanna-white-tee",
] as const;

const BESTSELLER_RANK = new Map<string, number>(
  BESTSELLER_HANDLES.map((handle, index) => [handle, index]),
);

export function sortProductsByBestsellers(products: Product[]): Product[] {
  return products
    .map((product, originalIndex) => ({ product, originalIndex }))
    .sort((a, b) => {
      const aRank = BESTSELLER_RANK.get(a.product.handle);
      const bRank = BESTSELLER_RANK.get(b.product.handle);
      const fallbackStart = BESTSELLER_HANDLES.length;

      return (
        (aRank ?? fallbackStart + a.originalIndex) -
        (bRank ?? fallbackStart + b.originalIndex)
      );
    })
    .map(({ product }) => product);
}
