import AppLayout from "@/components/layout/AppLayout";

export default function MainGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
