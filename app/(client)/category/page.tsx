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
  Flame,
  Grid,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Product Categories | UShop",
  description: "Browse top tech product categories on UShop. Laptops, smartphones, accessories, appliances, and gaming gear.",
};

const CategoryPage = async () => {
  const allCategories: Category[] = (await getCategories()) || [];

  // Filter only top categories (exclude subcategories that have a parent reference)
  const topCategories = allCategories.filter(
    (cat: Category & { parent?: { _id?: string }; level?: string }) =>
      !cat.parent || !cat.parent._id || cat.level === "top" || cat.level === "root"
  );

  const displayTopCategories = topCategories.length > 0 ? topCategories : allCategories;

  // Filter Popular Categories from the top categories
  const popularCategories = displayTopCategories.filter((cat) => cat.featured);
  const displayPopularCategories =
    popularCategories.length > 0
      ? popularCategories
      : displayTopCategories.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50/50 py-6">
      <Container>
        {/* Breadcrumb Navigation */}
        <DynamicBreadcrumb
          customItems={[{ label: "Categories", href: "/category" }]}
        />

        {/* Hero Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xs border border-gray-100 mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-ushop-pink/10 text-ushop-pink text-xs font-bold rounded-full mb-3">
              <Layers className="w-4 h-4" /> Top Category Directory
            </span>
            <Title className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-2">
              Browse Top Categories
            </Title>
            <p className="text-gray-600 text-sm max-w-xl">
              Discover top tech equipment, smartphones, computers, accessories, and campus electronics sorted by specialized categories.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-ushop-purple hover:bg-ushop-purple-dark text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              <Package className="w-4 h-4" />
              <span>All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/brands"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:border-ushop-pink text-gray-700 hover:text-ushop-pink text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              <Tag className="w-4 h-4" />
              <span>Shop Brands</span>
            </Link>
          </div>
        </div>

        {/* Section 1: Popular Categories */}
        {displayPopularCategories.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200/80">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ushop-pink to-ushop-purple text-white flex items-center justify-center shadow-xs">
                  <Flame className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                    Popular Categories
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Most requested & trending tech categories on UShop.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayPopularCategories.map((category) => {
                const imageUrl = category.image ? urlFor(category.image).url() : null;
                const slug = category.slug?.current || "";

                return (
                  <Link
                    key={category._id}
                    href={`/category/${slug}`}
                    className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:shadow-xl hover:border-ushop-pink/30 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Top Badges */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200/60 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                        Popular
                      </span>

                      {category.range && (
                        <span className="bg-ushop-pink/10 text-ushop-pink px-2.5 py-0.5 rounded-md text-xs font-medium">
                          {category.range}
                        </span>
                      )}
                    </div>

                    {/* Image & Category Details */}
                    <div className="flex items-center gap-5 my-2">
                      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-ushop-pink/5 to-gray-50 border border-gray-100 flex items-center justify-center shrink-0 p-2 overflow-hidden group-hover:scale-105 transition-transform duration-300">
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
                        {category.description ? (
                          <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                            {category.description}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-400 italic mt-1">
                            Popular tech gear in {category.title}.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Footer Link */}
                    <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-ushop-pink group-hover:gap-2 transition-all">
                      <span>Explore Category</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 2: All Categories (Top Categories Only) */}
        {displayTopCategories.length > 0 ? (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200/80">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-ushop-purple/10 text-ushop-purple flex items-center justify-center">
                  <Grid className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                    All Categories
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Complete list of top-level product classifications on UShop.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayTopCategories.map((category) => {
                const imageUrl = category.image ? urlFor(category.image).url() : null;
                const slug = category.slug?.current || "";

                return (
                  <Link
                    key={category._id}
                    href={`/category/${slug}`}
                    className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-xs hover:shadow-md hover:border-ushop-pink/30 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Category Thumbnail */}
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
                          <span className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded-md shadow-2xs">
                            Popular
                          </span>
                        )}
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-bold text-gray-900 text-base group-hover:text-ushop-pink transition-colors mb-1">
                        {category.title}
                      </h3>

                      {category.description ? (
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                          {category.description}
                        </p>
                      ) : (
                        <p className="text-xs text-gray-400 italic mb-3">
                          Browse all products in {category.title}.
                        </p>
                      )}
                    </div>

                    {/* Footer Action */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-700 group-hover:text-ushop-pink transition-colors">
                      <span>Shop {category.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center max-w-md mx-auto my-12 shadow-xs">
            <Package className="w-12 h-12 text-ushop-pink/40 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No Categories Available
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              There are currently no active product categories configured. Check back soon!
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-ushop-purple hover:bg-ushop-purple-dark text-white text-xs font-bold rounded-xl transition-colors"
            >
              <Package className="w-4 h-4" />
              <span>Browse All Products</span>
            </Link>
          </div>
        )}

        
      </Container>
    </div>
  );
};

export default CategoryPage;
