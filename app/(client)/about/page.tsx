import React from "react";
import Container from "@/components/Container";
import Link from "next/link";
import { contactConfig } from "@/config/contact";
import {
  Store,
  ShieldCheck,
  Truck,
  Users,
  GraduationCap,
  Sparkles,
  PhoneCall,
  Mail,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "About Us | U-Shop Ghana",
  description:
    "Learn about U-Shop — Ghana's dedicated student and campus-centered tech marketplace for authentic electronics, phones, and computing gear.",
};

const AboutPage = () => {
  const highlights = [
    {
      icon: <GraduationCap className="w-6 h-6 text-ushop-pink" />,
      title: "Campus-First Marketplace",
      description:
        "Built specifically for Ghanaian university students, staff, and tech enthusiasts with hubs across major tertiary institutions.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: "Verified Student Merchants",
      description:
        "Every seller undergoes verification to ensure genuine products, honest grading, and transparent warranty coverage.",
    },
    {
      icon: <Truck className="w-6 h-6 text-ushop-purple" />,
      title: "Fast 24-48hr Campus Delivery",
      description:
        "Direct hostel and campus pickups with secure mobile money integration and cash-on-delivery options.",
    },
    {
      icon: <Store className="w-6 h-6 text-amber-500" />,
      title: "Student Seller Hub",
      description:
        "Empowering students to start e-commerce stores, sell electronics safely, and build campus commerce ventures.",
    },
  ];

  return (
    <div className="bg-[#fbfbfd] min-h-screen py-12 sm:py-16 md:py-20">
      <Container>
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ushop-pink/10 text-ushop-pink text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Mission & Vision</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Ghana&apos;s Leading Campus Tech Marketplace
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-4 leading-relaxed max-w-2xl mx-auto">
            U-Shop connects university students and tech buyers with trusted sellers, verified stores, and unbeatable deals on laptops, smartphones, and accessories.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 sm:mb-24">
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Empowering Campus Commerce
            </h2>
            <p>
              Buying tech gear on campus shouldn&apos;t come with risks. U-Shop was founded to solve the challenge of finding genuine, affordable gadgets, laptops, and student tech accessories across universities in Ghana.
            </p>
            <p>
              By combining strict seller vetting, student ID verification, and clear warranty terms, we create a secure and frictionless commerce experience tailored to university life.
            </p>
            <div className="pt-2 flex flex-col gap-2 font-medium text-gray-800 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified student merchants & vetted tech dealers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Encrypted mobile money checkout (MTN MoMo, Telecel Cash, AT)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hostel delivery & dedicated campus pickup points</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#6B1FA8] via-[#520f85] to-[#2e084d] text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <h3 className="text-xl sm:text-2xl font-bold mb-3">Our Core Promise</h3>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-6">
              Every device on U-Shop is inspected for quality, and every transaction is safeguarded by our buyer protection guarantee.
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-white/15 pt-6">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">100%</p>
                <p className="text-xs text-white/70">Verified Sellers</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">5+</p>
                <p className="text-xs text-white/70">Campus Hubs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Value Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 sm:mb-24">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs hover:shadow-lg hover:border-ushop-pink/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 border border-gray-100">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-ushop-purple to-ushop-pink text-white text-center shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
            Ready to Explore Campus Deals?
          </h2>
          <p className="text-xs sm:text-sm text-white/90 max-w-lg mx-auto mb-6">
            Discover student offers, browse verified stores, or join as a campus merchant today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/shop"
              className="px-6 py-3 bg-white text-gray-900 text-xs sm:text-sm font-bold rounded-xl shadow-md hover:bg-gray-100 transition-colors"
            >
              Shop Products
            </Link>
            <a
              href="https://seller.ushopgh.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-black/30 hover:bg-black/40 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors border border-white/20"
            >
              Sell on U-Shop
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
