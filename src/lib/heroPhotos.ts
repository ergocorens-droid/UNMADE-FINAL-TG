/** Wszystkie pliki: photo1 (1).png … photo1 (15).png */
export const HERO_PHOTO_PATHS = Array.from(
  { length: 15 },
  (_, i) => `/photo1 (${i + 1}).png`,
);

/** Hero strony głównej — tylko telefon: (1)–(3) */
export const HERO_PHOTO_PATHS_MOBILE = HERO_PHOTO_PATHS.slice(0, 3);

/** Hero strony głównej — tylko desktop: rotacja (4)–(15) */
export const HERO_PHOTO_PATHS_DESKTOP = HERO_PHOTO_PATHS.slice(3);

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
