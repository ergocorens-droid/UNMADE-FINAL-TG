export default function SklepLoading() {
  return (
    <div className="bg-white pb-20">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <div className="space-y-3 text-center lg:text-left">
          <div className="mx-auto h-10 max-w-md animate-pulse rounded bg-neutral-100 lg:mx-0" />
          <div className="mx-auto h-4 max-w-sm animate-pulse rounded bg-neutral-100 lg:mx-0" />
        </div>
        <div className="mt-12 flex flex-col gap-10 lg:flex-row">
          <aside className="hidden w-64 shrink-0 space-y-3 lg:block">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-10 animate-pulse rounded-xl bg-neutral-100"
              />
            ))}
          </aside>
          <div className="min-w-0 flex-1">
            <div className="mb-8 flex justify-between gap-4">
              <div className="h-10 w-28 animate-pulse rounded-lg bg-neutral-100 lg:hidden" />
              <div className="ml-auto h-10 w-full max-w-xs animate-pulse rounded bg-neutral-100" />
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-square animate-pulse rounded-2xl bg-neutral-100" />
                  <div className="h-4 w-[75%] animate-pulse rounded bg-neutral-100" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
