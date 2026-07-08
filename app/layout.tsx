import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className="font-poppins antialiased">{children}</body>
    </html>
  );
};
export default RootLayout;
