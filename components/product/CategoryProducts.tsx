"use client";

import React, { useState, useMemo } from "react";
import { Category, Product } from "@/sanity.types";
import ProductCard from "../ProductCard";
import NoProductsAvailable from "./NoProductsAvailable";
import { Grid3X3, ArrowUpDown, LayoutGrid } from "lucide-react";

interface Props {
  categories: Category[];
  slug: string;
  initialProducts: Product[];
}

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

const CategoryProducts = ({ categories, slug, initialProducts }: Props) => {
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const currentCategory = useMemo(() => {
    return categories.find((cat) => cat.slug?.current === slug);
  }, [categories, slug]);

  const sortedProducts = useMemo(() => {
    const productsCopy = [...initialProducts];
    if (sortBy === "price-asc") {
      return productsCopy.sort((a, b) => (a.price || 0) - (b.price || 0));
    }
    if (sortBy === "price-desc") {
      return productsCopy.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    if (sortBy === "name-asc") {
      return productsCopy.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }
    return productsCopy; // default (featured / sanity order)
  }, [initialProducts, sortBy]);

  if (!initialProducts || initialProducts.length === 0) {
    return (
      <div className="py-10">
        <NoProductsAvailable selectedTab={currentCategory?.title || slug} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Sorting bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-gray-100/50 shadow-sm">
        <div className="flex items-center gap-2 text-zinc-600">
          <LayoutGrid size={18} className="text-ushop-pink" />
          <span className="text-sm font-medium">
            Showing <span className="font-semibold text-ushop-purple">{sortedProducts.length}</span> products
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <ArrowUpDown size={16} />
            <span>Sort by:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-sm font-semibold text-zinc-700 bg-white border border-zinc-200 hover:border-ushop-pink focus:border-ushop-purple rounded-xl px-3 py-1.5 outline-none cursor-pointer hoverEffect shadow-xs"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
