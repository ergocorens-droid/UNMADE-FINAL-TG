import Link from "next/link";

function PayIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-8 items-center justify-center rounded border border-neutral-300 bg-neutral-100 px-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-600">
      {children}
    </span>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 text-neutral-600">
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-6">
        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
          <PayIcon>Visa</PayIcon>
          <PayIcon>Mastercard</PayIcon>
          <PayIcon>PayPal</PayIcon>
          <PayIcon>Apple Pay</PayIcon>
          <PayIcon>Google Pay</PayIcon>
          <PayIcon>BLIK</PayIcon>
        </div>
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-xs text-neutral-700 md:text-left">
            © 2026 UNMADE
          </p>
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs uppercase tracking-wide">
            <Link href="/regulamin" className="hover:text-neutral-900">
              Regulamin
            </Link>
            <Link href="/polityka-prywatnosci" className="hover:text-neutral-900">
              Polityka prywatności
            </Link>
            <Link href="/warunki-uslugi" className="hover:text-neutral-900">
              Warunki usługi
            </Link>
            <Link href="/wysylka" className="hover:text-neutral-900">
              Wysyłka
            </Link>
            <Link href="/kontakt" className="hover:text-neutral-900">
              Kontakt
            </Link>
            <Link href="/o-nas" className="hover:text-neutral-900">
              O nas
            </Link>
          </nav>
          <div className="flex justify-center gap-4 md:justify-end">
            <Link
              href="https://instagram.com/unmade.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wide hover:text-neutral-900"
              aria-label="Instagram UNMADE"
            >
              Instagram
            </Link>
            <Link
              href="https://www.tiktok.com/@unmade.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wide hover:text-neutral-900"
              aria-label="TikTok UNMADE"
            >
              TikTok
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
