import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { getServerLocale, getServerT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  const locale = await getServerLocale();
  return {
    title: `${t("metadata.kontaktTitle")} | UNMADE`,
    description: t("metadata.kontaktDescription"),
    openGraph: {
      title: `${t("metadata.kontaktTitle")} | UNMADE`,
      url: "https://unmade.pl/kontakt",
      locale: locale === "pl" ? "pl_PL" : "en_US",
    },
  };
}

export default async function KontaktPage() {
  const t = await getServerT();

  return (
    <div className="bg-white pb-24 pt-12 md:pt-16">
      <div className="mx-auto max-w-[640px] px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--unmade-accent)]">
          {t("contactPage.tagline")}
        </p>
        <h1 className="mt-4 text-3xl font-bold uppercase tracking-[0.15em] text-neutral-900">
          {t("contactPage.title")}
        </h1>
        <div className="mt-8 space-y-2 text-sm text-neutral-600">
          <p>
            {t("contactPage.emailLabel")}{" "}
            <a href="mailto:kontakt@unmade.pl" className="text-neutral-900 underline">
              kontakt@unmade.pl
            </a>
          </p>
          <p>
            {t("contactPage.instagramLabel")}{" "}
            <a
              href="https://instagram.com/unmade.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 underline"
            >
              @unmade.pl
            </a>
          </p>
          <p>
            {t("contactPage.tiktokLabel")}{" "}
            <a
              href="https://www.tiktok.com/@unmade.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 underline"
            >
              @unmade.pl
            </a>
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
