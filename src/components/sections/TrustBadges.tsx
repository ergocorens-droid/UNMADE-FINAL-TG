import { getServerT } from "@/i18n/server";

export async function TrustBadges() {
  const t = await getServerT();

  return (
    <section className="border-t border-neutral-200 bg-neutral-100 py-14 lg:py-16">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 md:grid-cols-3 md:gap-8">
        <div className="text-center md:text-left">
          <p className="text-2xl" aria-hidden>
            🌍
          </p>
          <h3 className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-neutral-900">
            {t("trustBadges.nationwideTitle")}
          </h3>
          <p className="mt-2 text-sm text-neutral-600">{t("trustBadges.nationwideSub")}</p>
        </div>
        <div className="text-center md:text-left">
          <p className="text-2xl" aria-hidden>
            📦
          </p>
          <h3 className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-neutral-900">
            {t("trustBadges.freeTitle")}
          </h3>
          <p className="mt-2 text-sm text-neutral-600">{t("trustBadges.freeSub")}</p>
        </div>
        <div className="text-center md:text-left">
          <p className="text-2xl" aria-hidden>
            ↩
          </p>
          <h3 className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-neutral-900">
            {t("trustBadges.returnsTitle")}
          </h3>
          <p className="mt-2 text-sm text-neutral-600">{t("trustBadges.returnsSub")}</p>
        </div>
      </div>
    </section>
  );
}
