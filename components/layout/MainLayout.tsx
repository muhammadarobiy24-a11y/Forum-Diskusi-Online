import DiscordLayout from "./discord/DiscordLayout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DiscordLayout>{children}</DiscordLayout>;
}
