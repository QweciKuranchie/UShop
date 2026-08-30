import React from "react";
import { Product } from "@/sanity.types";
import ProductCard from "./ProductCard";
import Container from "./Container";
import Title from "./Title";
import Link from "next/link";
import { TrendingUp, ArrowRight, Sparkles } from "lucide-react";

interface PopularProductSectionProps {
  products: Product[];
}

const PopularProductSection: React.FC<PopularProductSectionProps> = ({
  products,
}) => {
  if (!products || products.length === 0) {
    return null;
  }

  // Display top 8 popular products
  const displayProducts = products.slice(0, 8);

  return (
    <Container className="mt-16 lg:mt-24">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-1 w-12 bg-gradient-to-r from-ushop-purple to-ushop-pink rounded-full"></div>
          <Title className="text-3xl lg:text-4xl font-bold text-dark-color flex items-center gap-2">
            Popular Products
          </Title>
          <div className="h-1 w-12 bg-gradient-to-l from-ushop-purple to-ushop-pink rounded-full"></div>
        </div>
        <p className="text-light-color text-lg max-w-2xl mx-auto">
          Customer favorites and top trending picks loved by students and shoppers
        </p>

        <div className="flex items-center justify-center gap-3 mt-6">
          <Link
            href="/deals"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-ushop-purple/10 to-ushop-pink/10 text-ushop-purple font-semibold rounded-full hover:from-ushop-purple hover:to-ushop-pink hover:text-white border-2 border-ushop-purple/20 hover:border-transparent hoverEffect shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-ushop-pink group-hover:text-white" />
            <span>Explore All Trending</span>
            <ArrowRight className="w-4 h-4 hoverEffect group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Popular Products Wrapper with subtle gradient frame */}
      <div className="bg-gradient-to-br from-white via-ushop_light_bg to-ushop-purple/5 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl border border-ushop-purple/10">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-ushop-purple/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-ushop-purple/10 text-ushop-purple flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Top Rated & Trending
              </h3>
              <p className="text-xs text-light-color">
                Handpicked based on reviews and customer demand
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold text-ushop-purple bg-ushop-purple/10 px-3 py-1 rounded-full">
            {displayProducts.length} Items
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map((product, index) => (
            <div key={product._id} className="hoverEffect transform hover:-translate-y-1">
              <ProductCard
                product={product}
                priority={index < 4}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PopularProductSection;
