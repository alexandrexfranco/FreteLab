import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FreteLab: Calculadoras, Ferramentas e Conteúdo para Transporte e Logística",
    template: "%s | FreteLab",
  },
  description:
    "A principal plataforma de ferramentas gratuitas para caminhoneiros e transportadores: cálculo de frete, custo por km, cubagem, frete ANTT, pedágio e gestão logística.",
  metadataBase: new URL("https://fretelab.com.br"),
  openGraph: {
    title: "FreteLab",
    description: "Calculadoras, Ferramentas e Conteúdo para Transporte e Logística",
    url: "https://fretelab.com.br",
    siteName: "FreteLab",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreteLab",
    description: "Calculadoras, Ferramentas e Conteúdo para Transporte e Logística",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Preconnect to external API and AdSense domains */}
        <link rel="preconnect" href="https://fipe.parallelum.com.br" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fipe.parallelum.com.br" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
