"use client";

import { Inter, Bricolage_Grotesque } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import TopBanner from "@/components/TopBanner";
import { CartProvider } from "@/context/CartContext";
import { SiteProvider } from "@/context/SiteContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable}`}>
      {/* We need metadata back, so adding it via a head block or separated metadata export */}
      <head>
        <title>Nutrio — Functional Bars rooted in Ayurveda</title>
        <meta name="description" content="Six Ayurveda-powered functional bars. No refined sugar. No preservatives." />
      </head>
      <body className={`font-sans antialiased bg-white text-black min-h-screen flex flex-col ${isAdmin ? 'admin-layout' : ''}`}>
        <SiteProvider>
          <CartProvider>
            {!isAdmin && <TopBanner />}
            {!isAdmin && <Header />}
            <main className="flex-1 bg-white">
              {children}
            </main>
            {!isAdmin && <Footer />}
            {!isAdmin && <CartSidebar />}
          </CartProvider>
        </SiteProvider>
      </body>
    </html>
  );
}
