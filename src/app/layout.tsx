import type { Metadata } from "next";
import { Playfair_Display, Roboto } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingContactPanel } from "@/components/floating-contact-panel";
import { ParallaxWrapper } from "@/components/providers/parallax-provider";
import { ScrollIndicator } from "@/components/scroll-indicator";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: 'swap',
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ION Green Energy Storage Systems",
  description:
    "ION Green BESS clone – commercial, industrial, and residential energy storage systems from 5kWh to 5MWh.",
  metadataBase: new URL("https://iongreen.itmingo.com"),
  openGraph: {
    title: "ION Green Energy Storage Systems",
    description:
      "One-stop ESS integrator delivering rack-mounted, hybrid, and containerized battery solutions.",
    url: "https://iongreen.itmingo.com",
    siteName: "ION Green Energy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${roboto.variable} font-sans`}>
      <body className="min-h-screen bg-background font-sans antialiased font-roboto">
        <ParallaxWrapper>
          <ScrollIndicator />
          <SiteHeader />
          {children}
          <SiteFooter />
          <FloatingContactPanel />
        </ParallaxWrapper>
      </body>
    </html>
  );
}
