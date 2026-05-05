import Link from "next/link";

export function InstagramCta() {
  return (
    <section className="border-t border-neutral-200 bg-neutral-50 py-20 text-center">
      <div className="mx-auto max-w-[720px] px-6">
        <p className="text-3xl font-bold uppercase tracking-[0.2em] text-neutral-900 md:text-4xl">
          @unmade.pl
        </p>
        <Link
          href="https://instagram.com/unmade.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-xs uppercase tracking-[0.25em] text-neutral-600 transition hover:text-neutral-900"
        >
          Obserwuj nas na Instagramie →
        </Link>
      </div>
    </section>
  );
}
