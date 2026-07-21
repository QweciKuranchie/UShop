import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { UserDataProvider } from "@/contexts/UserDataContext";
import { SanityLive } from "@/sanity/lib/live";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "U-Shop",
  description: "U-Shop, Your trusted C2C e-commerce for tech equipment",
  icons: {
    icon: [
      { url: "/assets/logos/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" }
    ],
    shortcut: "/assets/logos/favicon/favicon.ico",
    apple: [
      { url: "/assets/logos/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <ClerkProvider appearance={{ theme: shadcn }}>
          <UserDataProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <SpeedInsights />
            <Analytics /> 
            <SanityLive />
            <Toaster position="bottom-right" />
          </UserDataProvider>
        </ClerkProvider>
  );
}
