"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/sanity.types";
import ProductCard from "./ProductCard";
import { Flame, Clock, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

interface FlashSaleSectionProps {
  products: Product[];
}

const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({ products }) => {
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

  if (!products || products.length === 0) {
    return null;
  }

  // Take top 4 products for flash deal banner
  const dealProducts = products.slice(0, 4);

  return (
    <section className="my-10 bg-gradient-to-r from-red-500/5 via-ushop-red/10 to-amber-50/80 rounded-3xl p-6 sm:p-8 border border-ushop-red/20 shadow-xs relative overflow-hidden">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-ushop-red/15">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-ushop-red text-white flex items-center justify-center shadow-md shrink-0 animate-pulse">
            <Flame className="w-7 h-7 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-ushop-red text-white text-[10px] font-extrabold uppercase tracking-wider rounded-full">
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

        {/* Live Timer & View All */}
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between md:justify-end">
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
        </div>
      </div>

      {/* Deal Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {dealProducts.map((product) => (
          <div key={product._id} className="relative group">
            {/* Flash Deal Tag */}
            <div className="absolute top-3 left-3 z-10 bg-ushop-red text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <Zap className="w-3 h-3 fill-white" />
              HOT DEAL
            </div>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlashSaleSection;
