import { ThemeProvider } from "@/components/theme-provider";
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
      <body className="flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="flex items-center border-b">
            <div className="border-r px-4 py-2 sm:px-6 sm:py-4">
              <h1 className="text-2xl font-serif">Artguessr</h1>
            </div>
            <div className="px-4 py-2 sm:px-6 sm:py-4">
              <h2 className="text-muted-foreground">
                Art is <span className="italic underline">not</span> timeless.
              </h2>
            </div>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
