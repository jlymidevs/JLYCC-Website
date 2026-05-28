import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ScrollToTop from "@/components/ScrollToTop";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import FloatingLiveButton from "@/components/FloatingLiveButton";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jesus Loves You City Church - A Legacy of Spiritual Authority",
  description:
    "Join us at Jesus Loves You City Church. Experience Spirit-filled worship, life-changing community, and a mission to transform lives across our city and beyond.",
  keywords: ["church", "non-profit", "worship", "community", "faith", "city church"],
  openGraph: {
    title: "Jesus Loves You City Church",
    description: "A Legacy of Spiritual Authority",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <ThemeProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-crimson-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
        >
          Skip to main content
        </a>

        <AnnouncementBanner />
        {children}
        <ScrollToTop />
        <FloatingLiveButton />
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="69e71f2006d5d5fc13d842b0"
          strategy="lazyOnload"
        />
        </ThemeProvider>
      </body>
    </html>
  );
}
