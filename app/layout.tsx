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
            <h1 className="text-2xl font-serif">Artguessr</h1>
            <Separator orientation="vertical" />
            <h2 className="text-muted-foreground">
              Art is <span className="italic underline">not</span> timeless.
            </h2>
            <ModeToggle className="ml-auto" />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
