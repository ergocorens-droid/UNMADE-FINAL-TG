export default function SklepLoading() {
  return (
    <div className="bg-white pb-20">
      <div className="aspect-[21/9] min-h-[220px] w-full animate-pulse bg-neutral-200 md:min-h-[320px]" />
      <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-14">
        <div className="mb-10 aspect-video animate-pulse rounded bg-neutral-200" />
        <div className="flex flex-col gap-10 lg:flex-row">
          <aside className="space-y-2 lg:w-56">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-10 animate-pulse rounded bg-neutral-100"
              />
            ))}
          </aside>
          <div className="flex-1">
            <div className="mb-10 h-10 max-w-xs animate-pulse rounded bg-neutral-100" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
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
      </div>
    </div>
  );
}
