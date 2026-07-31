"use client";



interface CategoryListSkeletonProps {
  count?: number;
}

export default function CategoryListSkeleton({ count = 6 }: CategoryListSkeletonProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className="relative flex flex-col p-6 rounded-[24px] h-full"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex flex-col h-full space-y-4">
            <div className="h-6 w-3/4 rounded-lg bg-white/5 animate-pulse" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-full rounded-md bg-white/5 animate-pulse" />
              <div className="h-4 w-5/6 rounded-md bg-white/5 animate-pulse" />
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center">
              <div className="h-4 w-24 rounded-md bg-white/5 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
