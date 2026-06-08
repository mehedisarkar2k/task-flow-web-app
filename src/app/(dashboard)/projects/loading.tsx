export default function ProjectsLoading() {
  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Page header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="h-8 w-32 bg-surface-variant rounded-md animate-pulse mb-2" />
          <div className="h-5 w-48 bg-surface-variant rounded-md animate-pulse" />
        </div>
        <div className="h-10 w-32 bg-surface-variant rounded-md animate-pulse shrink-0" />
      </div>

      {/* Filter bar skeleton */}
      <div className="bg-card rounded-xl border border-border p-3 sm:p-4 h-[68px] flex items-center justify-between">
        <div className="flex gap-2 w-full max-w-md">
          <div className="h-9 w-full bg-surface-variant rounded-md animate-pulse" />
          <div className="h-9 w-32 bg-surface-variant rounded-md animate-pulse hidden sm:block" />
          <div className="h-9 w-32 bg-surface-variant rounded-md animate-pulse hidden sm:block" />
        </div>
        <div className="h-9 w-[72px] bg-surface-variant rounded-md animate-pulse shrink-0" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl p-5 flex flex-col min-h-[220px]"
          >
            {/* Top Meta */}
            <div className="flex justify-between items-start mb-4">
              <div className="h-6 w-3/4 bg-surface-variant rounded animate-pulse" />
              <div className="h-5 w-20 bg-surface-variant rounded-full animate-pulse shrink-0" />
            </div>
            {/* Content */}
            <div className="flex-1">
              <div className="h-4 w-full bg-surface-variant rounded animate-pulse mb-2" />
              <div className="h-4 w-5/6 bg-surface-variant rounded animate-pulse" />
            </div>
            {/* Footer Meta */}
            <div className="flex justify-between items-end mt-6 pt-4 border-t border-border">
              <div className="w-full flex flex-col gap-3">
                <div className="h-1.5 w-full bg-surface-variant rounded-full animate-pulse" />
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    <div className="h-7 w-7 bg-surface-variant rounded-full border-2 border-card animate-pulse" />
                    <div className="h-7 w-7 bg-surface-variant rounded-full border-2 border-card animate-pulse" />
                    <div className="h-7 w-7 bg-surface-variant rounded-full border-2 border-card animate-pulse" />
                  </div>
                  <div className="h-4 w-24 bg-surface-variant rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
