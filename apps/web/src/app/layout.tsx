import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/live";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";

const notoSans = Noto_Sans({ variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sthivaios.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={notoSans.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-row w-full p-5 items-center justify-center mt-10">
            <Navbar />
          </div>
          <div className="p-10">{children}</div>
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
