"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { PointerEvent, UIEvent } from "react";
import type {
  Image as ShopifyImage,
  ProductVariant,
} from "@/lib/shopify/types";

function updateZoomOrigin(e: PointerEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  e.currentTarget.style.setProperty("--zoom-x", `${x}%`);
  e.currentTarget.style.setProperty("--zoom-y", `${y}%`);
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isColorOption(name: string): boolean {
  return ["kolor", "color"].includes(normalize(name));
}

function isWhiteValue(value: string): boolean {
  const v = normalize(value);
  return ["bialy", "biale", "white"].some((x) => v.includes(x));
}

function isBlackValue(value: string): boolean {
  const v = normalize(value);
  return ["czarny", "czarne", "black"].some((x) => v.includes(x));
}

function colorKeywords(value: string): string[] {
  if (isBlackValue(value)) return ["black", "czarn", "czarne", "czarny"];
  if (isWhiteValue(value)) return ["white", "bial", "biale", "bialy"];
  return [normalize(value)];
}

function imageKey(image: ShopifyImage): string {
  return image.url.split("?")[0];
}

function uniqImages(images: ShopifyImage[]): ShopifyImage[] {
  const seen = new Set<string>();
  const unique: ShopifyImage[] = [];

  for (const image of images) {
    const key = imageKey(image);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(image);
  }

  return unique;
}

function variantColor(variant: ProductVariant | null): string | null {
  return (
    variant?.selectedOptions.find((option) => isColorOption(option.name))
      ?.value ?? null
  );
}

function imageLooksLikeColor(image: ShopifyImage, color: string): boolean {
  const haystack = normalize(`${image.altText ?? ""} ${image.url}`);
  return colorKeywords(color).some((keyword) => haystack.includes(keyword));
}

function sameColor(a: string, b: string): boolean {
  const aa = normalize(a);
  const bb = normalize(b);
  return aa === bb || colorKeywords(a).some((keyword) => bb.includes(keyword));
}

function variantColorOrder(variants: ProductVariant[]): string[] {
  const colors: string[] = [];

  for (const variant of variants) {
    const color = variantColor(variant);
    if (!color || colors.some((existing) => sameColor(existing, color))) continue;
    colors.push(color);
  }

  return colors;
}

function variantImageColorMap(variants: ProductVariant[]): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();

  for (const variant of variants) {
    const color = variantColor(variant);
    if (!color || !variant.image) continue;

    const key = imageKey(variant.image);
    const colors = map.get(key) ?? new Set<string>();
    colors.add(normalize(color));
    map.set(key, colors);
  }

  return map;
}

function imageBelongsOnlyToColor(
  image: ShopifyImage,
  color: string,
  imageColors: Map<string, Set<string>>,
): boolean {
  const colors = imageColors.get(imageKey(image));
  if (!colors || colors.size === 0) return true;

  const normalizedColor = normalize(color);
  const belongsToCurrent = [...colors].some(
    (value) => value === normalizedColor || sameColor(value, color),
  );

  return belongsToCurrent && colors.size === 1;
}

function imagesByMediaOrder(
  images: ShopifyImage[],
  variants: ProductVariant[],
  color: string,
): ShopifyImage[] {
  const colors = variantColorOrder(variants);
  const colorIndex = colors.findIndex((value) => sameColor(value, color));

  if (colors.length < 2 || colorIndex === -1) return [];

  return images.filter((_, index) => index % colors.length === colorIndex);
}

function imagesForColor(
  images: ShopifyImage[],
  variants: ProductVariant[],
  selectedVariant: ProductVariant | null,
): ShopifyImage[] {
  const color = variantColor(selectedVariant);
  if (!color) return images;

  const byVariant = variants
    .filter((variant) => variantColor(variant) === color)
    .map((variant) => variant.image)
    .filter((image): image is ShopifyImage => image !== null);

  const orderedImages = imagesByMediaOrder(images, variants, color);
  if (orderedImages.length >= 2) {
    return orderedImages;
  }

  const variantImages = uniqImages(byVariant);
  if (variantImages.length > 0) {
    const imageColors = variantImageColorMap(variants);
    const exclusiveImages = variantImages.filter((image) =>
      imageBelongsOnlyToColor(image, color, imageColors),
    );

    return exclusiveImages.length > 0 ? exclusiveImages : variantImages;
  }

  if (orderedImages.length > 0) {
    return orderedImages;
  }

  const galleryMatches = images.filter((image) => imageLooksLikeColor(image, color));
  const merged = uniqImages(galleryMatches);

  return merged.length > 0 ? merged : images;
}

export function ProductGallery({
  images,
  alt,
  variants = [],
  selectedVariant = null,
}: {
  images: ShopifyImage[];
  alt: string;
  variants?: ProductVariant[];
  selectedVariant?: ProductVariant | null;
}) {
  const baseList = useMemo(
    () => uniqImages(images.filter((im) => im.url.length > 0)),
    [images],
  );
  const list = useMemo(
    () => imagesForColor(baseList, variants, selectedVariant),
    [baseList, selectedVariant, variants],
  );
  const [current, setCurrent] = useState(0);
  const main = list[current] ?? list[0];

  useEffect(() => {
    setCurrent(0);
    const el = document.getElementById("product-mobile-gallery");
    if (el) el.scrollTo({ left: 0 });
  }, [selectedVariant?.id]);

  function handleMobileScroll(e: UIEvent<HTMLDivElement>) {
    const width = e.currentTarget.clientWidth;
    if (width <= 0) return;
    const next = Math.round(e.currentTarget.scrollLeft / width);
    if (next !== current) {
      setCurrent(Math.min(Math.max(next, 0), list.length - 1));
    }
  }

  function scrollToImage(index: number) {
    setCurrent(index);
    const el = document.getElementById("product-mobile-gallery");
    if (!el) return;
    el.scrollTo({ left: el.clientWidth * index, behavior: "smooth" });
  }

  if (!main) {
    return (
      <div className="aspect-square bg-white" aria-hidden />
    );
  }

  return (
    <div>
      <div
        id="product-mobile-gallery"
        className="flex snap-x snap-mandatory overflow-x-auto border border-black/[0.06] bg-white md:hidden"
        onScroll={handleMobileScroll}
      >
        {list.map((img, i) => (
          <div
            key={`${img.url}-mobile-${i}`}
            className="relative aspect-square w-full shrink-0 snap-center"
          >
            <Image
              src={img.url}
              alt={i === 0 ? alt : ""}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <div
        className="relative hidden aspect-square overflow-hidden border border-black/[0.06] bg-white [--zoom-x:50%] [--zoom-y:50%] md:block md:cursor-zoom-in"
        onPointerMove={updateZoomOrigin}
      >
        <Image
          src={main.url}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 ease-out [transform-origin:var(--zoom-x)_var(--zoom-y)] md:hover:scale-[1.85]"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      {list.length > 1 ? (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {list.map((img, i) => (
            <button
              key={`${img.url}-${i}`}
              type="button"
              onClick={() => scrollToImage(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden border bg-white ${
                i === current ? "border-neutral-900" : "border-black/[0.06]"
              }`}
            >
              <Image
                src={img.url}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
