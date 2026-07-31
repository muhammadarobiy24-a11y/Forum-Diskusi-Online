import ChannelSidebarWrapper from "./ChannelSidebarWrapper";

interface DiscordLayoutProps {
  children: React.ReactNode;
}

export default function DiscordLayout({ children }: DiscordLayoutProps) {
  return (
    <div
      className="flex h-screen w-screen overflow-hidden relative"
      style={{ background: "var(--forum-panel-bg, #faf9f6)" }}
    >
      {/* Subtle pastel orbs — sangat lembut */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div
          className="absolute rounded-full"
          style={{
            top: "-20%", left: "-10%",
            width: 700, height: 700,
            background: "radial-gradient(circle, #ede9fe 0%, transparent 70%)",
            opacity: 0.5,
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "40%", left: "60%",
            width: 500, height: 500,
            background: "radial-gradient(circle, #fde8d8 0%, transparent 70%)",
            opacity: 0.4,
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "70%", left: "5%",
            width: 400, height: 400,
            background: "radial-gradient(circle, #dbeafe 0%, transparent 70%)",
            opacity: 0.35,
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Layout */}
      <div className="relative z-10 flex w-full h-full">
        <ChannelSidebarWrapper />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
