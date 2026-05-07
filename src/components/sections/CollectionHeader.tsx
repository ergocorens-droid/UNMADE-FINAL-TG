import Image from "next/image";
import type { Collection } from "@/lib/shopify/types";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

type Props = {
  collection: Collection;
  size?: "lg" | "xl";
};

export function CollectionHeader({ collection, size = "lg" }: Props) {
  const heightClass =
    size === "xl"
      ? "min-h-[280px] md:min-h-[480px]"
      : "min-h-[200px] md:min-h-[320px]";

  const variant =
    collection.handle === "black"
      ? "black"
      : collection.handle === "white"
        ? "white"
        : "default";

  const plainDesc = collection.description
    ? stripHtml(collection.description)
    : "";

  const content = (
    <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-10 text-center">
      <h2
        className={`text-5xl font-bold uppercase tracking-widest md:text-7xl ${
          collection.image ? "text-white drop-shadow-lg" : ""
        }`}
      >
        {collection.title}
      </h2>
      {plainDesc ? (
        <p
          className={`mt-4 max-w-xl text-sm opacity-80 md:text-base ${
            collection.image ? "text-white" : ""
          }`}
        >
          {plainDesc}
        </p>
      ) : null}
    </div>
  );

  if (collection.image) {
    return (
      <div className={`relative w-full ${heightClass}`}>
        <Image
          src={collection.image.url}
          alt={collection.image.altText ?? collection.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-white/25" />
        <div className="absolute inset-0 flex items-stretch justify-center">
          {content}
        </div>
      </div>
    );
  }

  const paletteClasses =
      variant === "black"
        ? "bg-neutral-900 text-white"
        : variant === "white"
          ? "border-y border-neutral-200 bg-neutral-50 text-neutral-900"
          : "bg-neutral-100 text-neutral-900";

  return (
    <div
      className={`flex w-full items-stretch justify-center ${heightClass} ${paletteClasses}`}
    >
      {content}
    </div>
  );
}
