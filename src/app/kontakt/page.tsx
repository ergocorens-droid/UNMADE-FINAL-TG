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
    <div className="bg-[#f5f1ea] pb-24 pt-16 md:pt-24">
      <div className="mx-auto max-w-[760px] px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-neutral-500">
          {t("contactPage.tagline")}
        </p>
        <h1 className="mt-4 border-b border-black/[0.06] pb-8 text-4xl font-black uppercase leading-none tracking-normal text-neutral-950 md:text-6xl">
          {t("contactPage.title")}
        </h1>
        <div className="mt-8 space-y-3 text-sm text-neutral-700">
          <p>
            {t("contactPage.emailLabel")}{" "}
            <a href="mailto:kontakt@unmade.pl" className="font-medium text-neutral-950 underline">
              kontakt@unmade.pl
            </a>
          </p>
          <p>
            {t("contactPage.instagramLabel")}{" "}
            <a
              href="https://instagram.com/unmade.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-950 underline"
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
              className="font-medium text-neutral-950 underline"
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
