"use client";

import { useState } from "react";
import { useT } from "@/i18n/I18nContext";

export function ContactForm() {
  const { t } = useT();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-12 space-y-5">
        <div>
          <label htmlFor="c-name" className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
            {t("contactForm.name")}
          </label>
          <input
            id="c-name"
            name="name"
            required
            className="mt-2 w-full border border-black/[0.12] bg-transparent px-4 py-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
          />
        </div>
        <div>
          <label htmlFor="c-email" className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
            {t("contactForm.email")}
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            required
            className="mt-2 w-full border border-black/[0.12] bg-transparent px-4 py-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
          />
        </div>
        <div>
          <label htmlFor="c-subject" className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
            {t("contactForm.subject")}
          </label>
          <input
            id="c-subject"
            name="subject"
            required
            className="mt-2 w-full border border-black/[0.12] bg-transparent px-4 py-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
          />
        </div>
        <div>
          <label htmlFor="c-msg" className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
            {t("contactForm.message")}
          </label>
          <textarea
            id="c-msg"
            name="message"
            required
            rows={5}
            className="mt-2 w-full border border-black/[0.12] bg-transparent px-4 py-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-neutral-950 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800"
        >
          {t("contactForm.submit")}
        </button>
      </form>
      {sent && (
        <p className="mt-6 text-sm font-semibold text-[#2e7d32]" role="status">
          {t("contactForm.demoSent")}
        </p>
      )}
    </>
  );
}
