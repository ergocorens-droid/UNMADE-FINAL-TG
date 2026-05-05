import type { Metadata } from "next";

export const metadata: Metadata = { title: "Warunki usługi" };

export default function Page() {
  return (
    <div className="mx-auto max-w-[640px] bg-white px-6 py-16 text-sm text-neutral-700">
      <h1 className="text-2xl font-bold uppercase tracking-wide text-neutral-900">
        Warunki usługi
      </h1>
      <p className="mt-6">Treść warunków — placeholder.</p>
    </div>
  );
}
