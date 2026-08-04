import React from "react";
import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";
import HomeCategories from "@/components/HomeCategories";
import FlashSaleSection from "@/components/FlashSaleSection";
import { getCategories, getDealProducts } from "@/sanity/Queries";
import ShopByBrand from "@/components/ShopByBrand";
import ScrollToTop from "@/components/ScrollToTop";

const Home = async () => {
  const [categories, dealProducts] = await Promise.all([
    getCategories(6),
    getDealProducts(),
  ]);

  return (
    <Container className="bg-ushop_light_bg/80">
      <HomeBanner />
      {dealProducts && dealProducts.length > 0 && (
        <FlashSaleSection products={dealProducts} />
      )}
      <div className="py-10">
        <ProductGrid />
      </div>
      <HomeCategories categories={categories} />
      <ShopByBrand />
      <ScrollToTop />
    </Container>
  );
};

export default Home;
