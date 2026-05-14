import type { Metadata } from "next";
import { CookieNotice } from "@/components/CookieNotice";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "Rent Affordability Calculator | RentReadyCheck",
    template: "%s | RentReadyCheck",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteConfig.domain,
    siteName: siteConfig.name,
    title: "Rent Affordability Calculator | RentReadyCheck",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary",
    title: "Rent Affordability Calculator | RentReadyCheck",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <AdPlaceholder />
        </div>
        <Footer />
        <CookieNotice />
      </body>
    </html>
  );
}
