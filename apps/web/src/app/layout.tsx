import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/live";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";
import { Analytics } from "@vercel/analytics/next";
import Banner from "@/components/banner";
import { TooltipProvider } from "@/components/ui/tooltip";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sthivaios.dev",
  icons: {
    icon: [
      {
        url: "https://cdn.sthivaios.dev/boykisser_square_256.png",
        sizes: "256x256",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div className="flex flex-row w-full px-5 py-10 items-center justify-center">
              <div className="flex flex-col items-center justify-center w-full gap-10">
                <Banner />
                <Navbar />
              </div>
            </div>
            <div className="p-0">{children}</div>
            <div className="p-10 flex flex-row items-center justify-center w-full">
              <p className="text-muted">Stratos Thivaios © 2025</p>
            </div>
          </TooltipProvider>
        </ThemeProvider>
        <SanityLive />
        <Toaster richColors={true} />
        <Analytics />
      </body>
    </html>
  );
}
