import Container from "@/components/Container";
import Title from "@/components/Title";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { getCategories } from "@/sanity/Queries";
import { Category } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Package,
  Tag,
  Layers,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Product Categories | UShop",
  description: "Browse top tech product categories on UShop. Laptops, smartphones, accessories, appliances, and gaming gear.",
};

const CategoryPage = async () => {
  const categories: Category[] = (await getCategories()) || [];

  // Filter only top categories (top-level or featured)
  const topCategories = categories.filter(
    (cat: any) => !cat.parent || cat.level === "top" || cat.featured === true
  );
  const displayCategories = topCategories.length > 0 ? topCategories : categories;

  const featuredCategories = displayCategories.filter((cat) => cat.featured);

  return (
    <div className="min-h-screen bg-gray-50/50 py-6">
      <Container>
        {/* Breadcrumb Navigation */}
        <DynamicBreadcrumb
          customItems={[{ label: "Categories", href: "/category" }]}
        />

        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xs border border-gray-100 mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-ushop-pink/10 text-ushop-pink text-xs font-semibold rounded-full mb-3">
              <Layers className="w-4 h-4" /> Top Category Directory
            </span>
            <Title className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
              Browse Top Categories
            </Title>
            <p className="text-gray-600 text-sm max-w-xl">
              Discover top tech equipment, smartphones, computers, accessories, and electronics sorted by specialized categories.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-ushop-purple hover:bg-ushop-purple-dark text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
            >
              <Package className="w-4 h-4" />
              <span>All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/brands"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:border-ushop-pink text-gray-700 hover:text-ushop-pink text-xs font-semibold rounded-xl transition-all shadow-xs"
            >
              <Tag className="w-4 h-4" />
              <span>Shop Brands</span>
            </Link>
          </div>
        </div>

        {/* Featured Collections */}
        {featuredCategories.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Featured Collections
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCategories.map((category) => {
                const imageUrl = category.image ? urlFor(category.image).url() : null;
                const slug = category.slug?.current || "";

                return (
                  <Link
                    key={category._id}
                    href={`/category/${slug}`}
                    className="group relative bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-xl hover:border-ushop-pink/30 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Top Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200/60 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                        Featured
                      </span>

                      {category.range && (
                        <span className="bg-ushop-pink/10 text-ushop-pink px-2.5 py-0.5 rounded-md text-[11px] font-medium">
                          {category.range}
                        </span>
                      )}
                    </div>

                    {/* Image & Main Info */}
                    <div className="flex items-center gap-5 my-2">
                      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-ushop-pink/5 to-gray-50 border border-gray-100 flex items-center justify-center shrink-0 p-2 overflow-hidden group-hover:scale-105 transition-transform">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={category.title || "Category"}
                            fill
                            className="object-contain p-2"
                          />
                        ) : (
                          <Package className="w-8 h-8 text-ushop-pink" />
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-ushop-pink transition-colors">
                          {category.title}
                        </h3>
                        {category.description && (
                          <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Footer Action */}
                    <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-ushop-pink group-hover:gap-2 transition-all">
                      <span>Explore Collection</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Top Categories Grid */}
        {displayCategories.length > 0 ? (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Top Categories
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Explore top product classifications on UShop.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayCategories.map((category) => {
                const imageUrl = category.image ? urlFor(category.image).url() : null;
                const slug = category.slug?.current || "";

                return (
                  <Link
                    key={category._id}
                    href={`/category/${slug}`}
                    className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-xs hover:shadow-md hover:border-ushop-pink/30 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Header */}
                      <div className="relative w-full h-36 rounded-xl bg-gray-50/80 border border-gray-100 flex items-center justify-center mb-4 p-3 overflow-hidden group-hover:bg-ushop-pink/5 transition-colors">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={category.title || "Category"}
                            fill
                            className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <Package className="w-10 h-10 text-ushop-pink/40" />
                        )}

                        {category.featured && (
                          <span className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <h3 className="font-bold text-gray-900 text-base group-hover:text-ushop-pink transition-colors mb-1">
                        {category.title}
                      </h3>

                      {category.description ? (
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                          {category.description}
                        </p>
                      ) : (
                        <p className="text-xs text-gray-400 italic mb-3">
                          Explore items in {category.title}.
                        </p>
                      )}
                    </div>

                    {/* Footer Action */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-700 group-hover:text-ushop-pink transition-colors">
                      <span>Shop {category.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-md mx-auto my-12 shadow-xs">
            <Package className="w-12 h-12 text-ushop-pink/40 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No Categories Available
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              There are currently no active product categories configured. Check back soon!
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-ushop-purple hover:bg-ushop-purple-dark text-white text-xs font-semibold rounded-xl transition-colors"
            >
              <Package className="w-4 h-4" />
              <span>Browse All Products</span>
            </Link>
          </div>
        )}

        {/* Feature Badges Footer */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-xl bg-ushop-pink/10 text-ushop-pink flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Verified Equipment</h4>
              <p className="text-xs text-gray-500 mt-0.5">Checked products from trusted merchants & campus sellers.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Best Direct Prices</h4>
              <p className="text-xs text-gray-500 mt-0.5">Competitive deals straight from verified vendors.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Fast Nationwide Delivery</h4>
              <p className="text-xs text-gray-500 mt-0.5">Quick campus pick-up & doorstep delivery across Ghana.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
