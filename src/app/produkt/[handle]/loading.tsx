export default function ProduktLoading() {
  return (
    <div className="min-h-screen bg-white pb-20 pt-6 md:pt-10">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <div className="h-4 w-40 animate-pulse rounded bg-neutral-100" />
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="aspect-square animate-pulse rounded-2xl bg-neutral-100" />
          <div className="space-y-6">
            <div className="h-10 w-4/5 animate-pulse rounded bg-neutral-100" />
            <div className="h-8 w-32 animate-pulse rounded bg-neutral-100" />
            <div className="h-32 animate-pulse rounded bg-neutral-100" />
            <div className="h-12 animate-pulse rounded bg-neutral-200" />
            <div className="space-y-2 pt-6">
              <div className="h-4 animate-pulse rounded bg-neutral-100" />
              <div className="h-4 animate-pulse rounded bg-neutral-100" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-neutral-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
