/** Numery `photo1 (N).png` w /public — brak (11) (plik usunięty). */
const HERO_PHOTO_NUMBERS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15,
] as const;

export const HERO_PHOTO_PATHS = HERO_PHOTO_NUMBERS.map(
  (n) => `/photo1 (${n}).png`,
);

/** Tylko telefon w hero: (1), (2), (12) */
const HERO_MAIN_MOBILE_NUMBERS = new Set([1, 2, 12]);

/** Hero strony głównej — tylko telefon */
export const HERO_PHOTO_PATHS_MOBILE = HERO_PHOTO_NUMBERS.filter((n) =>
  HERO_MAIN_MOBILE_NUMBERS.has(n),
).map((n) => `/photo1 (${n}).png`);

/** Hero — desktop: bez (1), (2), (12) */
export const HERO_PHOTO_PATHS_DESKTOP = HERO_PHOTO_NUMBERS.filter(
  (n) => !HERO_MAIN_MOBILE_NUMBERS.has(n),
).map((n) => `/photo1 (${n}).png`);

export function pickRandomMobileHeroPhoto(): string {
  const pool = HERO_PHOTO_PATHS_MOBILE;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx] ?? pool[0];
}

export function pickRandomHeroPhoto(): string {
  const idx = Math.floor(Math.random() * HERO_PHOTO_PATHS.length);
  return HERO_PHOTO_PATHS[idx] ?? HERO_PHOTO_PATHS[0];
}

export function pickHeroPhotoByIndex(seed: number): string {
  const n = HERO_PHOTO_PATHS.length;
  const idx = ((seed % n) + n) % n;
  return HERO_PHOTO_PATHS[idx] ?? HERO_PHOTO_PATHS[0];
}
