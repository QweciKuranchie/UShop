import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "U-Shop | Trusted C2C E-Commerce & Tech Equipment",
  description: "U-Shop, Your trusted C2C e-commerce for tech equipment and campus marketplaces",
  icons: {
    icon: "/favicon.ico",
    apple: "/assets/logos/favicon/apple-touch-icon.png",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className="font-poppins antialiased">{children}</body>
    </html>
  );
};
export default RootLayout;
