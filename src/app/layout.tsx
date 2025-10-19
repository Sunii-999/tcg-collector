import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TCG",
  description: "Pokemon TCG collector",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <main className="max-w-screen">
          <Navbar />
        <div className="min-h-screen mt-10 w-[95%] mx-auto">
          {children}
        </div>
        <Footer />
        </main>
      </body>
    </html>
  );
}
