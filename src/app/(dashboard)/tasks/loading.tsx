export default function TasksLoading() {
  return (
    <div className="flex flex-col h-full gap-6 max-w-[1200px] mx-auto w-full px-4 md:px-8 py-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-end">
        <div>
          <div className="h-10 w-48 bg-surface-container-high rounded-md mb-3"></div>
          <div className="h-5 w-64 bg-surface-container rounded-md"></div>
        </div>
        <div className="h-10 w-28 bg-surface-container-high rounded-lg"></div>
      </div>

      {/* Filter Bar Skeleton */}
      <div className="bg-surface/50 border border-outline-variant rounded-xl p-4 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px] h-10 bg-surface-container rounded-lg"></div>
        <div className="w-[140px] h-10 bg-surface-container rounded-lg"></div>
        <div className="w-[140px] h-10 bg-surface-container rounded-lg"></div>
        <div className="w-[140px] h-10 bg-surface-container rounded-lg"></div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-outline-variant bg-surface-container-low">
          <div className="col-span-1"><div className="w-4 h-4 rounded bg-surface-variant"></div></div>
          <div className="col-span-5"><div className="w-24 h-4 rounded bg-surface-variant"></div></div>
          <div className="col-span-2 hidden sm:block"><div className="w-16 h-4 rounded bg-surface-variant"></div></div>
          <div className="col-span-2"><div className="w-16 h-4 rounded bg-surface-variant"></div></div>
          <div className="col-span-2 text-right"><div className="w-20 h-4 rounded bg-surface-variant ml-auto"></div></div>
        </div>

        {/* Table Rows */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="grid grid-cols-12 gap-4 p-4 border-b border-outline-variant/50 items-center">
            <div className="col-span-1"><div className="w-4 h-4 rounded bg-surface-container"></div></div>
            <div className="col-span-5 flex flex-col gap-2">
              <div className="w-3/4 h-5 rounded bg-surface-container-high"></div>
            </div>
            <div className="col-span-2 hidden sm:block">
              <div className="w-20 h-4 rounded bg-surface-container"></div>
            </div>
            <div className="col-span-2">
              <div className="w-20 h-6 rounded-full bg-surface-container-high"></div>
            </div>
            <div className="col-span-2 text-right flex justify-end">
              <div className="w-24 h-5 rounded bg-surface-container"></div>
            </div>
          </div>
        ))}
        
        {/* Pagination Skeleton */}
        <div className="px-4 py-3 bg-surface-container-lowest flex items-center justify-between">
          <div className="w-40 h-4 rounded bg-surface-container"></div>
          <div className="flex gap-2">
            <div className="w-16 h-8 rounded bg-surface-container"></div>
            <div className="w-16 h-8 rounded bg-surface-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
