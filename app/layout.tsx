import type { Metadata } from "next";
import { Nunito, Fira_Code } from "next/font/google";
import { Toaster } from "sonner";
import QueryProvider from "@/components/providers/QueryProvider";
import SessionProvider from "@/components/providers/SessionProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { ColorThemeProvider } from "@/components/providers/ColorThemeProvider";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Forum Diskusi — Community Platform",
  description: "Join communities, share ideas, and connect with people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${firaCode.variable} h-full font-sans`}
      style={{ fontFamily: "var(--font-nunito), Nunito, ui-sans-serif, system-ui, sans-serif" }}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Light mode is the default — set bg immediately to prevent flash
                  document.documentElement.style.setProperty('--app-bg', '#faf9f6');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="h-full overflow-hidden font-sans antialiased"
        style={{ fontFamily: "var(--font-nunito), Nunito, ui-sans-serif, system-ui, sans-serif" }}
      >
        <ThemeProvider defaultTheme="system" storageKey="forum-theme">
          <ColorThemeProvider>
            <QueryProvider>
              <SessionProvider>
                {children}
                <Toaster position="top-right" richColors />
              </SessionProvider>
            </QueryProvider>
          </ColorThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
