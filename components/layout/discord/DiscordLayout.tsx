import ServerRail from "./ServerRail";
import ChannelSidebarWrapper from "./ChannelSidebarWrapper";

interface DiscordLayoutProps {
  children: React.ReactNode;
}

export default function DiscordLayout({ children }: DiscordLayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ background: "var(--dc-chat-bg)" }}>
      {/* Panel 1 — Server rail */}
      <ServerRail />

      {/* Panel 2 — Channel sidebar */}
      <ChannelSidebarWrapper />

      {/* Panel 3+4 — Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
