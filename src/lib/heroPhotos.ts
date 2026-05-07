/** Wszystkie pliki: photo1 (1).png … photo1 (15).png */
export const HERO_PHOTO_PATHS = Array.from(
  { length: 15 },
  (_, i) => `/photo1 (${i + 1}).png`,
);

/** Tylko telefon w hero: photo1 (1), (2), (12) */
const HERO_MAIN_MOBILE_IDX = [0, 1, 11] as const;
const HERO_MAIN_MOBILE_SET = new Set<number>(HERO_MAIN_MOBILE_IDX);

/** Hero strony głównej — tylko telefon */
export const HERO_PHOTO_PATHS_MOBILE = HERO_MAIN_MOBILE_IDX.map(
  (i) => HERO_PHOTO_PATHS[i] ?? HERO_PHOTO_PATHS[0],
);

/** Hero — desktop: m.in. (3), bez (1), (2), (12) */
export const HERO_PHOTO_PATHS_DESKTOP = HERO_PHOTO_PATHS.filter(
  (_, i) => !HERO_MAIN_MOBILE_SET.has(i),
);

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
