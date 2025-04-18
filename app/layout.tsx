import { LinkButton } from "@/components/link-button";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Artguessr",
  description: "Art is *not* timeless.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col h-dvh overflow-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="flex items-center gap-4 sm:gap-8 border-b h-12 sm:h-16 flex-shrink-0 px-4 sm:px-8">
            <h1 className="text-2xl font-serif">
              Artguessr
              <span className="text-muted-foreground text-base pl-4 hidden sm:inline">
                Art is <span className="italic">not</span> timeless.
              </span>
            </h1>
            <Separator orientation="vertical" />
            <LinkButton href="/">All</LinkButton>
            <LinkButton href="/popular">Popular</LinkButton>
            <ModeToggle className="ml-auto hidden sm:inline-flex" />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
