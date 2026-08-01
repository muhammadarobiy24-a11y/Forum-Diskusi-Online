import DiscordLayout from "./discord/DiscordLayout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <DiscordLayout>{children}</DiscordLayout>;
}
