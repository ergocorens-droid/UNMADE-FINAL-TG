"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-12 space-y-5">
        <div>
          <label htmlFor="c-name" className="text-[10px] uppercase tracking-wide text-neutral-600">
            Imię
          </label>
          <input
            id="c-name"
            name="name"
            required
            className="mt-2 w-full border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 focus:border-[var(--unmade-accent)] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="c-email" className="text-[10px] uppercase tracking-wide text-neutral-600">
            Email
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            required
            className="mt-2 w-full border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 focus:border-[var(--unmade-accent)] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="c-subject" className="text-[10px] uppercase tracking-wide text-neutral-600">
            Temat
          </label>
          <input
            id="c-subject"
            name="subject"
            required
            className="mt-2 w-full border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 focus:border-[var(--unmade-accent)] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="c-msg" className="text-[10px] uppercase tracking-wide text-neutral-600">
            Wiadomość
          </label>
          <textarea
            id="c-msg"
            name="message"
            required
            rows={5}
            className="mt-2 w-full border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 focus:border-[var(--unmade-accent)] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-neutral-900 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[var(--unmade-accent)]"
        >
          WYŚLIJ
        </button>
      </form>
      {sent && (
        <p className="mt-6 text-sm font-semibold text-[#2e7d32]" role="status">
          Wiadomość wysłana (demo front-end — bez backendu).
        </p>
      )}
    </>
  );
}
