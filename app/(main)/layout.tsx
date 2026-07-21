import DiscordLayout from "@/components/layout/discord/DiscordLayout";

export default function MainGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DiscordLayout>{children}</DiscordLayout>;
}
