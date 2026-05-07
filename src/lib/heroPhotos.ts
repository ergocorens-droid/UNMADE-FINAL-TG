/** Pliki w /public: photo1 (1).png … photo1 (15).png */
export const HERO_PHOTO_PATHS = Array.from(
  { length: 15 },
  (_, i) => `/photo1 (${i + 1}).png`,
);

export function pickRandomHeroPhoto(): string {
  const idx = Math.floor(Math.random() * HERO_PHOTO_PATHS.length);
  return HERO_PHOTO_PATHS[idx] ?? HERO_PHOTO_PATHS[0];
}

export function pickHeroPhotoByIndex(seed: number): string {
  const n = HERO_PHOTO_PATHS.length;
  const idx = ((seed % n) + n) % n;
  return HERO_PHOTO_PATHS[idx] ?? HERO_PHOTO_PATHS[0];
}
