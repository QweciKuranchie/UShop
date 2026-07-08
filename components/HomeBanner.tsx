"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

function HomeBanner() {
  return (
    <div className="relative overflow-hidden bg-[#4a0d6c] text-white rounded-3xl px-8 py-12 md:py-16 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 w-full min-h-[480px]">
      {/* Background decorative circles & gradients for depth */}
      <div className="absolute top-1/2 -translate-y-1/2 right-4 lg:right-16 w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 -translate-y-1/2 right-12 lg:right-32 w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full border border-white/5 pointer-events-none -z-10" />

      {/* Left content block */}
      <div className="flex-1 space-y-6 z-10 max-w-lg">
        <div className="inline-flex items-center gap-2 bg-[#D4009B] text-white text-[11px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-widest w-max">
          <Sparkles className="w-3.5 h-3.5" />
          Limited Time Offer
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
          Up to 50% Off on <br />
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] to-[#c084fc] filter drop-shadow-[0_2px_8px_rgba(236,72,153,0.25)]">
            Flash Sales
          </span>
        </h1>
        
        <p className="text-gray-300 text-sm sm:text-base font-medium leading-relaxed max-w-md">
          Grab the best deals on verified tech equipment before stocks run out.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/deals"
            className="inline-flex items-center gap-2 bg-white text-[#4a0d6c] font-extrabold px-6 py-3.5 rounded-xl hover:bg-gray-100 transition-all shadow-lg shadow-black/10 text-sm hoverEffect group"
          >
            Buy Now <ArrowRight className="w-4 h-4 text-[#D4009B] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Right image block */}
      <div className="relative z-10 w-full md:w-1/2 max-w-[400px] md:max-w-none flex justify-center items-center">
        {/* Decorative circle backdrop for image */}
        <div className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] rounded-full bg-white/5 border border-white/10 pointer-events-none -z-10" />
        
        {/* Main image container */}
        <div className="relative p-1.5 bg-white/5 border border-white/10 rounded-2xl shadow-2xl shadow-black/30 overflow-visible w-full max-w-[360px]">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden">
            <Image
              src="/assets/images/hero/homepage.png"
              alt="Flash Sales Showcase"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 360px"
              priority
            />
          </div>
          
          {/* Floating Price Badge */}
          <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white px-4 py-3 rounded-2xl shadow-xl border border-gray-100/50 flex flex-col items-start min-w-[130px] z-20">
            <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider leading-none">
              Starting from
            </span>
            <span className="text-lg font-black text-[#4a0d6c] mt-1 leading-none">
              GH₵ 1,500
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
