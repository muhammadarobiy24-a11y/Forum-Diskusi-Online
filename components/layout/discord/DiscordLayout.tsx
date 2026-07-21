import ServerRail from "./ServerRail";
import ChannelSidebarWrapper from "./ChannelSidebarWrapper";

interface DiscordLayoutProps {
  children: React.ReactNode;
}

export default function DiscordLayout({ children }: DiscordLayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden dc-chat-bg">
      {/* Panel 1 — Server rail (72px) */}
      <ServerRail />

      {/* Panel 2 — Channel sidebar (240px) — detects community slug from URL */}
      <ChannelSidebarWrapper />

      {/* Panel 3+4 — Main content + optional member list */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
