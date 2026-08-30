import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import DealCountdown from "@/components/DealCountdown";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { Product } from "@/sanity.types";
import { getDealProducts } from "@/sanity/Queries";
import {
  Flame,
  Zap,
  ShoppingBag,
  GraduationCap,
  Tag,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hot Deals & Special Offers | UShop",
  description: "Browse flash sales, student discounts, clearance items, and exclusive daily deals on UShop.",
};

const dealsCategories = [
  {
    title: "Flash Sales",
    badge: "Up to 90% OFF",
    description: "Limited-time lightning deals with massive price drops.",
    href: "/deals/flash",
    icon: Zap,
    color: "from-ushop-red to-red-600",
  },
  {
    title: "Student Deals",
    badge: "Up to 90% OFF",
    description: "Verified campus pricing on laptops, accessories & tech.",
    href: "/deals/students",
    icon: GraduationCap,
    color: "from-emerald-600 to-teal-600",
  },
  {
    title: "Clearance",
    badge: "Up to 50% OFF",
    description: "Final markdowns and last-chance inventory discounts.",
    href: "/deals/clearance",
    icon: Tag,
    color: "from-amber-600 to-orange-600",
  },
  {
    title: "Black Friday",
    badge: "Mega Sales",
    description: "The biggest savings event of the year on UShop.",
    href: "/deals/black-friday",
    icon: ShoppingBag,
    color: "from-gray-900 to-gray-800",
  },
  {
    title: "Special Offers",
    badge: "Exclusive",
    description: "Curated seller promotions & seasonal bundle discounts.",
    href: "/deals/special-offers",
    icon: Sparkles,
    color: "from-ushop-purple to-ushop-pink",
  },
];

const MainDealsPage = async () => {
  const products = (await getDealProducts()) as unknown as Product[];

  const totalProducts = products?.length || 0;
  const avgDiscount =
    totalProducts > 0
      ? products.reduce((acc, p) => acc + (p?.discount || 0), 0) / totalProducts
      : 0;
  const maxDiscount =
    totalProducts > 0
      ? Math.max(...products.map((p) => p?.discount || 0))
      : 90;

  return (
    <div className="min-h-screen bg-gray-50/50 py-6">
      <Container>
        {/* Breadcrumb */}
        <DynamicBreadcrumb customItems={[{ label: "Deals & Offers", href: "/deals" }]} />

        {/* Hero Banner Card */}
        <div className="my-6 bg-gradient-to-r from-ushop-red via-red-600 to-amber-600 text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full mb-4">
                <Flame className="w-4 h-4 fill-white text-white animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider">
                  DEALS & OFFERS HUB
                </span>
                <span className="bg-white text-ushop-red text-xs font-bold px-2 py-0.5 rounded-full">
                  Up to {maxDiscount > 0 ? maxDiscount : 90}% OFF
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
                Daily Hot Deals & Special Sales
              </h1>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-6">
                Save big on verified smartphones, laptops, audio gear, appliances, and everyday tech essentials. Stock is limited!
              </p>

              {/* Deal Metrics */}
              <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/20">
                  <div className="text-xs text-white/80 font-medium">Active Deals</div>
                  <div className="text-2xl font-black">{totalProducts} Items</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/20">
                  <div className="text-xs text-white/80 font-medium">Average Savings</div>
                  <div className="text-2xl font-black">{avgDiscount.toFixed(0)}% OFF</div>
                </div>
              </div>
            </div>

            {/* Countdown Box */}
            <div className="w-full lg:w-auto bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-3xl shrink-0">
              <DealCountdown />
            </div>
          </div>
        </div>

        {/* Featured Sales Categories Cards */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Title className="text-2xl font-black text-gray-900">
                Explore Deal Categories
              </Title>
              <p className="text-xs text-gray-500 mt-1">
                Filter savings by flash sales, student discounts, and clearance markdowns.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {dealsCategories.map((cat) => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-lg hover:border-ushop-pink/30 hoverEffect flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${cat.color} text-white flex items-center justify-center shadow-md`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-50 text-ushop-red border border-red-100">
                        {cat.badge}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-ushop-pink transition-colors mb-1">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-ushop-pink group-hover:translate-x-1 transition-transform">
                    <span>Shop Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
            <div>
              <Title className="text-xl sm:text-2xl font-bold text-gray-900">
                All Active Hot Deals
              </Title>
              <p className="text-xs text-gray-500 mt-0.5">
                Showing {products.length} discounted items ready for fast dispatch.
              </p>
            </div>
          </div>

          {products && products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-md mx-auto my-10 shadow-xs">
              <Flame className="w-12 h-12 text-ushop-red/40 mx-auto mb-4 animate-bounce" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">No Deals Currently Active</h3>
              <p className="text-xs text-gray-500 mb-6">
                Check back soon for new flash sales and daily discounts!
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-ushop-pink hover:bg-ushop-pink/90 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default MainDealsPage;
