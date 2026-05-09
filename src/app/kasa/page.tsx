import { BackToShopLink } from "@/components/BackToShopLink";
import { getServerT } from "@/i18n/server";

export default async function Page() {
  const t = await getServerT();

  return (
    <div className="mx-auto max-w-[480px] bg-white px-6 py-24 text-center">
      <h1 className="text-xl font-bold uppercase tracking-wide text-neutral-900">
        {t("pages.checkoutTitle")}
      </h1>
      <p className="mt-4 text-sm text-neutral-600">{t("pages.checkoutSubtitle")}</p>
      <BackToShopLink
        labelKey="pages.continueShopping"
        className="mt-8 inline-block text-xs uppercase text-neutral-900 underline"
      />
    </div>
  );
}
