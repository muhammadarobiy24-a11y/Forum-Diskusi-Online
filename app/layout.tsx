import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { Toaster } from "sonner";
import QueryProvider from "@/components/providers/QueryProvider";
import SessionProvider from "@/components/providers/SessionProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { ColorThemeProvider } from "@/components/providers/ColorThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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
      className={`${inter.variable} ${firaCode.variable} h-full antialiased`}
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
      <body className="h-full overflow-hidden">
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
