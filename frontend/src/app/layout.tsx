import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        <div className="flex flex-col min-h-screen">
          {/* <Header /> */}
          <div className="container mx-auto flex-1 py-10"></div>
          {children}
        </div>
      </body>
    </html>
  );
}
