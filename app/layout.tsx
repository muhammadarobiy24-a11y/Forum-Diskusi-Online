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
                  var theme = localStorage.getItem('forum-theme');
                  if (theme === 'dark' || theme === 'light') {
                    document.documentElement.classList.add(theme);
                  } else if (theme === 'system' || !theme) {
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.add('light');
                    }
                  }
                  // Apply color theme background to prevent flash
                  var colorTheme = localStorage.getItem('forum-color-theme') || 'frosted';
                  var bgs = {
                    frosted: 'linear-gradient(135deg, #0d0d1a 0%, #0f0a1e 40%, #0a1020 100%)',
                    midnight: 'linear-gradient(135deg, #020818 0%, #030d2e 40%, #030c28 100%)',
                    slate: 'linear-gradient(135deg, #0a0f0a 0%, #0d1a10 40%, #091208 100%)'
                  };
                  document.documentElement.style.setProperty('--app-bg', bgs[colorTheme] || bgs.frosted);
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
