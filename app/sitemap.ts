import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ushopgh.com";

interface SanityItem {
  slug: { current: string };
  _updatedAt?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/category`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/deal`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/universities`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  try {
    // Fetch dynamic content from Sanity
    const [products, categories, brands] = await Promise.all([
      client.fetch<SanityItem[]>(
        `*[_type == "product" && defined(slug.current)]{ slug, _updatedAt }`
      ),
      client.fetch<SanityItem[]>(
        `*[_type == "category" && defined(slug.current)]{ slug, _updatedAt }`
      ),
      client.fetch<SanityItem[]>(
        `*[_type == "brand" && defined(slug.current)]{ slug, _updatedAt }`
      ),
    ]);

    const productRoutes: MetadataRoute.Sitemap = (products || []).map(
      (product) => ({
        url: `${BASE_URL}/product/${product.slug.current}`,
        lastModified: product._updatedAt ? new Date(product._updatedAt) : new Date(),
        changeFrequency: "daily",
        priority: 0.7,
      })
    );

    const categoryRoutes: MetadataRoute.Sitemap = (categories || []).map(
      (category) => ({
        url: `${BASE_URL}/category/${category.slug.current}`,
        lastModified: category._updatedAt ? new Date(category._updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      })
    );

    const brandRoutes: MetadataRoute.Sitemap = (brands || []).map((brand) => ({
      url: `${BASE_URL}/brand/${brand.slug.current}`,
      lastModified: brand._updatedAt ? new Date(brand._updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));

    return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...brandRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticRoutes;
  }
}
