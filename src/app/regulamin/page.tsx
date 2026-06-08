import type { Metadata } from "next";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { RegulaminBody } from "@/components/legal/RegulaminBody";
import { WithdrawalFormAppendix } from "@/components/legal/WithdrawalFormAppendix";
import { getServerT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  return {
    title: `${t("metadata.termsDocTitle")} | CLTH.PL`,
    description: t("metadata.termsDocDescription"),
    robots: { index: true, follow: true },
  };
}

export default function RegulaminPage() {
  return (
    <LegalArticle title="REGULAMIN SKLEPU INTERNETOWEGO CLTH.PL">
      <RegulaminBody />
      <WithdrawalFormAppendix />
    </LegalArticle>
  );
}
