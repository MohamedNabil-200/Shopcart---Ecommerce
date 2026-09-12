import type { Metadata } from "next";
import "./globals.css";
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Shopcart online store",
  description: "Shopcart online store, you one stop shop for all you needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", figtree.variable)}>
      <body className="min-h-full flex flex-col font-poppins antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
