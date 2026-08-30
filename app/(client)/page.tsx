import React from "react";
import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";
import HomeCategories from "@/components/HomeCategories";
import FlashSaleSection from "@/components/FlashSaleSection";
import { getCategories, getDealProducts } from "@/sanity/Queries";
import ShopByBrand from "@/components/ShopByBrand";
import ScrollToTop from "@/components/ScrollToTop";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo";

const Home = async () => {
  const [categories, dealProducts] = await Promise.all([
    getCategories(6),
    getDealProducts(),
  ]);

  const orgSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      {/* Structured Data (JSON-LD) for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(orgSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      <Container className="bg-ushop_light_bg/80">
        <HomeBanner />
        {dealProducts && dealProducts.length > 0 && (
          <FlashSaleSection products={dealProducts} />
        )}
        <HomeCategories categories={categories} />
        <ShopByBrand />
        <div className="py-10">
          <ProductGrid />
        </div>
        <ScrollToTop />
      </Container>
    </>
  );
};

export default Home;
