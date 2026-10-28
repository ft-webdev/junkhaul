import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/geist-latin-wght-normal.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin-wght-normal.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Driveway-Safe Junk Removal in DFW`,
    template: `%s | ${site.name}`,
  },
  description:
    "Premium junk removal and hauling across Dallas, Collin County, and Rockwall. Compact tandem trailer. Driveway-safe. Transparent fractional pricing.",
  openGraph: {
    title: `${site.name} | Driveway-Safe Junk Removal`,
    description:
      "Junk removal that doesn’t scratch your driveway. Serving Dallas–Fort Worth with transparent fractional pricing.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
