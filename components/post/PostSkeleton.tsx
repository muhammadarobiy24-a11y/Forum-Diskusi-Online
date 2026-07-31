"use client";

interface PostSkeletonProps {
  count?: number;
}

export default function PostSkeleton({ count = 5 }: PostSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i}
          className="flex flex-col gap-4 p-5 md:p-6 rounded-[24px]"
          style={{
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="h-7 w-3/4 bg-white/5 rounded animate-pulse" />
            <div className="h-6 w-20 bg-white/5 rounded-xl animate-pulse" />
          </div>
          
          <div className="space-y-2">
            <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
            <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-white/5 rounded animate-pulse" />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-white/5 animate-pulse" />
              <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-12 bg-white/5 rounded-2xl animate-pulse" />
              <div className="h-6 w-16 bg-white/5 rounded-2xl animate-pulse" />
              <div className="h-6 w-16 bg-white/5 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
