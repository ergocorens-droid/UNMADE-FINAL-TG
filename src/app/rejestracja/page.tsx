import { BackToShopLink } from "@/components/BackToShopLink";
import { getServerT } from "@/i18n/server";

export default async function Page() {
  const t = await getServerT();

  return (
    <div className="mx-auto max-w-[560px] bg-white px-6 py-24 text-center">
      <h1 className="border-b border-black/[0.06] pb-6 text-4xl font-black uppercase leading-none tracking-normal text-neutral-950">
        {t("header.register")}
      </h1>
      <p className="mt-4 text-sm text-neutral-600">
        {t("pages.registerSubtitle")}
      </p>
      <BackToShopLink className="mt-8 inline-block text-xs uppercase text-neutral-900 underline" />
    </div>
  );
}
