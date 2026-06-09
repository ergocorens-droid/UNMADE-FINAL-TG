import type { MetadataRoute } from "next";

const SITE_URL = "https://clth.pl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/kasa",
          "/logowanie",
          "/rejestracja",
          "/api/",
          "/_next/",
          "/*?q=*",
          "/*?sort=*",
          "/*?kolor=*",
          "/*?typ=*",
          "/*?kolekcja=*",
        ],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "Googlebot",
          "Bingbot",
        ],
        allow: "/",
        disallow: ["/kasa", "/logowanie", "/rejestracja", "/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
