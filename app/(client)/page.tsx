import React from "react";
import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";
import HomeCategories from "@/components/HomeCategories";
import { getCategories } from "@/sanity/Queries";
import ShopByBrand from "@/components/ShopByBrand";

const Home = async() => {
  const categories = await getCategories(6);
  
  return (
    <Container className="bg-shop_light_pink">
      <HomeBanner />
      <div className="py-10">
        <ProductGrid />
      </div>
      <HomeCategories categories={categories} />
      <ShopByBrand />
    </Container>
  );
};

export default Home;
