"use client";

export default function NotificationSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i}
          className="flex items-start gap-4 p-5 md:p-6 rounded-[24px]"
          style={{
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="h-10 w-10 shrink-0 rounded-full bg-white/5 animate-pulse mt-1" />
          
          <div className="flex-1 space-y-3 mt-1">
            <div className="flex items-center gap-3">
              <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
              <div className="h-4 w-4 bg-white/5 rounded animate-pulse" />
            </div>
            <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
            <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
