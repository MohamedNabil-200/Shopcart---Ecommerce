import { cn } from "cn";
import { Figtree } from "next/font/google";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={cn("font-sans", figtree.variable)}>
      <body className="min-h-full flex flex-col font-poppins antialiased">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
