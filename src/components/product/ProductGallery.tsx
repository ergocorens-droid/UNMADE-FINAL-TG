"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Image as ShopifyImage } from "@/lib/shopify/types";

export function ProductGallery({
  images,
  alt,
}: {
  images: ShopifyImage[];
  alt: string;
}) {
  const list = useMemo(
    () => images.filter((im) => im.url.length > 0),
    [images],
  );
  const [current, setCurrent] = useState(0);
  const main = list[current] ?? list[0];

  if (!main) {
    return (
      <div className="aspect-square rounded-2xl bg-neutral-100" aria-hidden />
    );
  }

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
        <Image
          src={main.url}
          alt={alt}
          fill
          className="object-cover"
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
              onClick={() => setCurrent(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-neutral-100 ${
                i === current ? "border-neutral-900" : "border-transparent"
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
