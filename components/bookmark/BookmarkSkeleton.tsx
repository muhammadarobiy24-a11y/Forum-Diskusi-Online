"use client";

export default function BookmarkSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-4 p-5 rounded-[28px] animate-pulse"
          style={{ background: "#f5f4f0", border: "1px solid #e5e3de" }}>
          <div className="flex items-start justify-between gap-4">
            <div className="h-5 w-3/4 bg-gray-200 rounded-full" />
            <div className="h-5 w-20 bg-gray-200 rounded-full" />
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gray-200" />
              <div className="h-4 w-24 bg-gray-200 rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-16 bg-gray-200 rounded-full" />
              <div className="h-6 w-16 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
