"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/sanity.types";
import ProductCard from "./ProductCard";
import { Flame, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface FlashSaleSectionProps {
  products: Product[];
}

const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({ products }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  // Timer state: 12 hours countdown
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    <section className="my-10 bg-gradient-to-r from-ushop-red/5 via-ushop-pink/10 to-ushop_light_bg rounded-2xl p-4 sm:p-8 border border-ushop-red/20 shadow-xs relative overflow-hidden">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-ushop-red/15">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-ushop-red text-white flex items-center justify-center shadow-md shrink-0 animate-pulse">
            <Flame className="w-7 h-7 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-ushop-red text-white text-xs font-bold uppercase tracking-wider rounded-full">
                Limited Time
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                Daily Flash Deals
              </h2>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Unbeatable discounts updated daily. Grab yours before stock runs out!
            </p>
          </div>
        </div>

        {/* Live Timer & View All & Navigation Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Countdown Clock */}
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs border border-ushop-red/30 px-3.5 py-2 rounded-2xl shadow-xs">
            <Clock className="w-4 h-4 text-ushop-red shrink-0" />
            <span className="text-xs font-semibold text-gray-700">Ends In:</span>
            <div className="flex items-center gap-1 font-mono text-xs font-bold text-gray-900">
              <span className="bg-ushop-red text-white px-2 py-1 rounded-lg">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span>:</span>
              <span className="bg-ushop-red text-white px-2 py-1 rounded-lg">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span>:</span>
              <span className="bg-ushop-red text-white px-2 py-1 rounded-lg">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>

          <Link
            href="/deals"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-ushop-red hover:bg-ushop-red/90 text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Scroll Nav Buttons */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => handleScroll("left")}
              aria-label="Previous flash deals"
              className="p-2 rounded-xl bg-white border border-ushop-red/20 text-gray-700 hover:text-ushop-red hover:border-ushop-red hoverEffect shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              aria-label="Next flash deals"
              className="p-2 rounded-xl bg-white border border-ushop-red/20 text-gray-700 hover:text-ushop-red hover:border-ushop-red hoverEffect shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Deal Products One-Line Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 sm:gap-5 pb-2 pt-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-ushop-red/30 scrollbar-track-transparent scroll-smooth"
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="w-[165px] sm:w-[220px] md:w-[250px] shrink-0 snap-start"
          >
            <ProductCard product={product} isFlashSale={true} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlashSaleSection;
