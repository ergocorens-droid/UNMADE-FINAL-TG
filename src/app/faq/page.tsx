import type { Metadata } from "next";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { FaqBody } from "@/components/legal/FaqBody";
import { getServerT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  return {
    title: `${t("metadata.faqDocTitle")} | CLTH.PL`,
    description: t("metadata.faqDocDescription"),
    robots: { index: true, follow: true },
  };
}

export default function Page() {
  return (
    <LegalArticle title="NAJCZĘŚCIEJ ZADAWANE PYTANIA">
      <FaqBody />
    </LegalArticle>
  );
}
