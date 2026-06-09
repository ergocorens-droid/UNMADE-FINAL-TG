import type { MetadataRoute } from "next";
import { getCollections, getProducts } from "@/lib/shopify/api";

const SITE_URL = "https://clth.pl";

export const revalidate = 3600;

function url(path = "") {
  return `${SITE_URL}${path}`;
}

function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
): MetadataRoute.Sitemap[number] {
  return {
    url: url(path),
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    entry("", 1, "daily"),
    entry("/sklep", 0.95, "daily"),
    entry("/sklep-t-shirts", 0.9, "daily"),
    entry("/sklep-bluzy", 0.85, "weekly"),
    entry("/sklep-need-money", 0.9, "daily"),
    entry("/sklep-cytaty", 0.9, "daily"),
    entry("/kolekcje", 0.75, "weekly"),
    entry("/kontakt", 0.6, "monthly"),
    entry("/dostawa-i-platnosc", 0.55, "monthly"),
    entry("/zwroty-i-odstapienie", 0.55, "monthly"),
    entry("/regulamin", 0.45, "monthly"),
    entry("/polityka-prywatnosci", 0.4, "monthly"),
    entry("/polityka-cookies", 0.35, "monthly"),
    entry("/faq", 0.6, "monthly"),
  ];

  try {
    const [products, collections] = await Promise.all([
      getProducts({ first: 250, cache: "no-store" }),
      getCollections(),
    ]);

    const productRoutes = products.map((product) =>
      entry(`/produkt/${product.handle}`, 0.85, "daily"),
    );
    const collectionRoutes = collections.map((collection) =>
      entry(`/kolekcja/${collection.handle}`, 0.7, "weekly"),
    );

    return [...staticRoutes, ...productRoutes, ...collectionRoutes];
  } catch {
    return staticRoutes;
  }
}
