import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Skontaktuj się z UNMADE — email, social media i formularz.",
};

export default function KontaktPage() {
  return (
    <div className="bg-white pb-24 pt-12 md:pt-16">
      <div className="mx-auto max-w-[640px] px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--unmade-accent)]">
          🔥 Odpowiadamy w 24h w dni robocze
        </p>
        <h1 className="mt-4 text-3xl font-bold uppercase tracking-[0.15em] text-neutral-900">
          KONTAKT
        </h1>
        <div className="mt-8 space-y-2 text-sm text-neutral-600">
          <p>
            Email:{" "}
            <a href="mailto:kontakt@unmade.pl" className="text-neutral-900 underline">
              kontakt@unmade.pl
            </a>
          </p>
          <p>
            Instagram:{" "}
            <a
              href="https://instagram.com/unmade.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 underline"
            >
              @unmade.pl
            </a>
          </p>
          <p>
            TikTok:{" "}
            <a
              href="https://www.tiktok.com/@unmade.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 underline"
            >
              @unmade.pl
            </a>
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
