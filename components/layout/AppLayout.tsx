import AppTopBar from "./AppTopBar";
import FloatingBottomNav from "./FloatingBottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col min-h-screen w-full"
      style={{ background: "var(--app-bg, #f5e6d3)" }}
    >
      {/* Top bar minimal */}
      <AppTopBar />

      {/* Main content — scrollable, padding bawah untuk bottom nav */}
      <main className="flex-1 overflow-y-auto with-bottom-nav">
        {children}
      </main>

      {/* Floating pill nav */}
      <FloatingBottomNav />
    </div>
  );
}
