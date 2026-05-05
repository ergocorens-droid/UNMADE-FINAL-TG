import Link from "next/link";

export default function Page() {
  return (
    <div className="mx-auto max-w-[480px] bg-white px-6 py-24 text-center">
      <h1 className="text-xl font-bold uppercase tracking-wide text-neutral-900">
        Logowanie
      </h1>
      <p className="mt-4 text-sm text-neutral-600">Panel klienta — wkrótce.</p>
      <Link href="/sklep" className="mt-8 inline-block text-xs uppercase text-neutral-900 underline">
        Wróć do sklepu
      </Link>
    </div>
  );
}
