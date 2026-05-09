import type { Metadata } from "next";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { DostawaPlatnoscBody } from "@/components/legal/DostawaPlatnoscBody";
import { getServerT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  return {
    title: `${t("metadata.deliveryPaymentDocTitle")} | UNMADE`,
    description: t("metadata.deliveryPaymentDocDescription"),
    robots: { index: true, follow: true },
  };
}

export default function Page() {
  return (
    <LegalArticle title="DOSTAWA I PŁATNOŚCI">
      <DostawaPlatnoscBody />
    </LegalArticle>
  );
}
