"use client";

import { useState } from "react";
import { useT } from "@/i18n/I18nContext";

export function NewsletterSection() {
  const { t } = useT();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section
      id="newsletter"
      className="border-t border-neutral-200 bg-white py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[640px] px-6 text-center">
        <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-neutral-900 md:text-xl">
          {t("newsletterSection.title")}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          {t("newsletterSection.subtitle")}
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            {t("newsletterSection.emailLabel")}
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder={t("newsletterSection.placeholder")}
            className="min-h-[48px] flex-1 border border-neutral-300 bg-neutral-50 px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[var(--unmade-accent)] focus:outline-none sm:max-w-xs"
          />
          <button
            type="submit"
            className="min-h-[48px] border border-neutral-900 bg-neutral-900 px-8 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[var(--unmade-accent)] hover:border-[var(--unmade-accent)]"
          >
            {t("newsletterSection.submit")}
          </button>
        </form>
        {sent && (
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#2e7d32]">
            {t("newsletterSection.thanks")}
          </p>
        )}
      </div>
    </section>
  );
}
