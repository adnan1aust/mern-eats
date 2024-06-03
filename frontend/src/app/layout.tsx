import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header.component";
import Footer from "@/components/Footer.component";
import AuthProvider from "@/components/AuthZeroProviderWIthNavigate.component";
import { Toaster } from "@/components/ui/sonner";

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
            <Toaster
              visibleToasts={1}
              position="bottom-right"
              richColors
              toastOptions={{
                style: {
                  color: "rgb(249,115,22)",
                  backgroundColor: "white",
                  borderColor: "rgb(249,115,22)",
                },
              }}
            />
            <div> {children}</div>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
