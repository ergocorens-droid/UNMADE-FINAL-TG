"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { PointerEvent } from "react";
import type { Image as ShopifyImage } from "@/lib/shopify/types";

function updateZoomOrigin(e: PointerEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  e.currentTarget.style.setProperty("--zoom-x", `${x}%`);
  e.currentTarget.style.setProperty("--zoom-y", `${y}%`);
}

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
      <div className="aspect-square bg-white" aria-hidden />
    );
  }

  return (
    <div>
      <div
        className="relative aspect-square overflow-hidden border border-black/[0.06] bg-white [--zoom-x:50%] [--zoom-y:50%] md:cursor-zoom-in"
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
              onClick={() => setCurrent(i)}
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
