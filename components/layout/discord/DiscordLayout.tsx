import ChannelSidebarWrapper from "./ChannelSidebarWrapper";

interface DiscordLayoutProps {
  children: React.ReactNode;
}

export default function DiscordLayout({ children }: DiscordLayoutProps) {
  return (
    <div
      className="flex h-screen w-screen overflow-hidden relative"
      style={{
        background:
          "var(--app-bg, linear-gradient(135deg, #0d0d1a 0%, #0f0a1e 40%, #0a1020 100%))",
        color: "white",
      }}
    >
      {/* Ambient orbs — dekoratif, tidak mengganggu */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div
          className="absolute rounded-full"
          style={{
            top: "-15%", left: "-10%",
            width: 600, height: 600,
            background:
              "radial-gradient(circle, var(--orb-color-1, #7c3aed) 0%, transparent 70%)",
            opacity: 0.12,
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "50%", left: "65%",
            width: 400, height: 400,
            background:
              "radial-gradient(circle, var(--orb-color-2, #3b82f6) 0%, transparent 70%)",
            opacity: 0.08,
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "75%", left: "15%",
            width: 350, height: 350,
            background:
              "radial-gradient(circle, var(--orb-color-3, #a855f7) 0%, transparent 70%)",
            opacity: 0.08,
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Layout — sidebar + main */}
      <div className="relative z-10 flex w-full h-full">
        <ChannelSidebarWrapper />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
