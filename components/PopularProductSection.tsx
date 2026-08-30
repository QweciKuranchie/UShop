import React from "react";
import { Product } from "@/sanity.types";
import ProductCard from "./ProductCard";
import Container from "./Container";
import Title from "./Title";
import Link from "next/link";
import { TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";

interface PopularProductSectionProps {
  products: Product[];
}

const PopularProductSection: React.FC<PopularProductSectionProps> = ({
  products,
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

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

        <Link
          href={"/deals"}
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-ushop-pink/10 text-ushop-pink font-semibold rounded-full hover:bg-ushop-pink hover:text-white border-2 border-ushop-pink/20 hover:border-ushop-pink hoverEffect"
        >
          Explore All Trending
          <svg
            className="w-4 h-4 hoverEffect group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
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

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-ushop-purple bg-ushop-purple/10 px-3 py-1 rounded-full">
              {products.length} Items
            </span>

            {/* Scroll Navigation Buttons */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => handleScroll("left")}
                aria-label="Previous products"
                className="p-2 rounded-xl bg-white border border-ushop-purple/20 text-gray-700 hover:text-ushop-purple hover:border-ushop-purple hoverEffect shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll("right")}
                aria-label="Next products"
                className="p-2 rounded-xl bg-white border border-ushop-purple/20 text-gray-700 hover:text-ushop-purple hover:border-ushop-purple hoverEffect shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* One-Line Scrollable Product Track */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 pb-2 pt-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-ushop-purple/30 scrollbar-track-transparent scroll-smooth"
        >
          {products.map((product, index) => (
            <div
              key={product._id}
              className="w-[230px] sm:w-[260px] md:w-[280px] shrink-0 snap-start hoverEffect transform hover:-translate-y-1"
            >
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
