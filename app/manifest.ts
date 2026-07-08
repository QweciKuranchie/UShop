import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "U-Shop",
    short_name: "U-Shop",
    description: "U-Shop, Your trusted C2C e-commerce for tech equipment",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#6B1FA8",
    icons: [
      {
        src: "/assets/logos/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/assets/logos/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/assets/logos/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/logos/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
