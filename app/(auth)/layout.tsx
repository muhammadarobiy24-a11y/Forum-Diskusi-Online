import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold">
            Online Forum
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">
            Join the conversation
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
