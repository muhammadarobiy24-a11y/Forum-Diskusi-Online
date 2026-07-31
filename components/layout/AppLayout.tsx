import FloatingBottomNav from "./FloatingBottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col min-h-screen w-full"
      style={{ background: "var(--forum-bg, #f5e6d3)" }}
    >
      {/* Main scrollable area */}
      <main className="flex-1 overflow-y-auto with-bottom-nav">
        {children}
      </main>

      {/* Floating pill nav */}
      <FloatingBottomNav />
    </div>
  );
}
