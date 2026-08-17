import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "U-Shop | Trusted C2C E-Commerce & Tech Equipment",
  description: "U-Shop, Your trusted C2C e-commerce for tech equipment and campus marketplaces",
  applicationName: "U-Shop",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "U-Shop",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/assets/logos/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/logos/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/assets/logos/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#6B1FA8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="mask-icon" href="/assets/logos/favicon/favicon-32x32.png" color="#6B1FA8" />
      </head>
      <body className="font-poppins antialiased">
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
};
export default RootLayout;
