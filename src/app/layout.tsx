import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arkosintelligence.com"),
  title: "Arkos Intelligence | Digital Hub",
  description: "A Infraestrutura de Inteligência da nova economia.",
  icons: {
    icon: [
      { url: "/favicon.svg?v=3", type: "image/svg+xml" },
      { url: "/arkos-icon.png?v=3", type: "image/png" },
    ],
    apple: [
      { url: "/arkos-icon.png?v=3", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Arkos Intelligence | Digital Hub",
    description: "A Infraestrutura de Inteligência da nova economia.",
    url: "/",
    siteName: "Arkos Intelligence",
    images: [
      {
        url: "/arkos-preview-light.png",
        width: 1200,
        height: 630,
        alt: "Arkos Intelligence — Digital Hub",
      },
    ],
    locale: "pt-BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arkos Intelligence | Digital Hub",
    description: "A Infraestrutura de Inteligência da nova economia.",
    images: ["/arkos-preview-light.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
