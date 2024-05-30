import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header.component";
import HeroSection from "@/components/HeroSection.component";
import Footer from "@/components/Footer.component";
import AuthProvider from "@/components/AuthZeroProviderWIthNavigate.component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MERN Eats",
  description: "A fullstack MERN app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <HeroSection />
            <div className="container mx-auto flex-1 py-10"> {children}</div>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
