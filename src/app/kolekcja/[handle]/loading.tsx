export default function KolekcjaLoading() {
  return (
    <div className="bg-white pb-20">
      <div className="min-h-[280px] w-full animate-pulse bg-neutral-200 md:min-h-[480px]" />
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8 md:py-16">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="h-5 w-40 animate-pulse rounded bg-neutral-100" />
          <div className="h-10 w-full max-w-xs animate-pulse rounded bg-neutral-100 sm:ml-auto" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-square animate-pulse rounded-2xl bg-neutral-100" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-100" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
