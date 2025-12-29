import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/live";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";

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
          <div className="flex flex-row w-full p-5 items-center justify-center mt-10">
            <Navbar />
          </div>
          <div className="p-0">{children}</div>
          <div className="p-10 flex flex-row items-center justify-center w-full">
            <p className="text-muted">Stratos Thivaios © 2025</p>
          </div>
        </ThemeProvider>
        <SanityLive />
        <Toaster richColors={true} />
      </body>
    </html>
  );
}
