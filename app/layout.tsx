import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "U-Shop",
  description: "U-Shop, Your trusted C2C e-commerce for tech equipment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" className={cn("font-sans", inter.variable)}
    >
      <body className="font-poppins antialiased">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
