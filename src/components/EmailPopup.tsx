"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "popup_dismissed";

export function EmailPopup({
  introDone,
}: {
  /** false while loading overlay visible */
  introDone: boolean;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!introDone) return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") return;
    } catch {
      return;
    }

    const t = window.setTimeout(() => setVisible(true), 5000);
    return () => window.clearTimeout(t);
  }, [introDone]);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dismiss();
  }

  if (!visible) return null;

  return (
    <div
      className="unmade-fade-in fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-popup-title"
    >
      <div className="unmade-scale-in relative max-w-[480px] flex-1 border border-neutral-200 bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 rounded p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--unmade-accent)]"
          aria-label="Zamknij"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2
          id="email-popup-title"
          className="pr-8 text-lg font-bold uppercase tracking-wide text-neutral-900 sm:text-xl"
        >
          ODBIERZ -10% NA PIERWSZY ZAKUP
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          Zapisz się do newslettera i odbierz kod rabatowy na maila. Dołącz do 500+
          osób, które nie przegapiają dropów.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <label htmlFor="popup-email" className="sr-only">
            Twój adres e-mail
          </label>
          <input
            id="popup-email"
            type="email"
            required
            placeholder="Twój adres e-mail"
            className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[var(--unmade-accent)] focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-neutral-900 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[var(--unmade-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--unmade-accent)]"
          >
            CHCĘ RABAT
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-neutral-500">
          Brak spamu. Tylko dropy i kody rabatowe.
        </p>
      </div>
    </div>
  );
}
