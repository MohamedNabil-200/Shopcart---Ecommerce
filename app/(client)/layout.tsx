import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

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
    <ClerkProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{ style: { background: "#000", color: "#fff" } }}
          />
        </main>
        <Footer />
      </div>
    </ClerkProvider>
  );
}
