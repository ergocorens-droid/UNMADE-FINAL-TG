import { SocialProofCarousel } from "@/components/SocialProofCarousel";

export function JoinCustomersSection() {
  return (
    <section className="border-t border-neutral-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <h2 className="mb-10 text-center text-base font-bold uppercase tracking-[0.18em] text-neutral-900 md:text-lg md:tracking-[0.22em]">
          DOŁĄCZ DO 500+ ZADOWOLONYCH KLIENTÓW
        </h2>
        <SocialProofCarousel />
      </div>
    </section>
  );
}
