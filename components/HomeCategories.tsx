import React from 'react'
import Title  from './Title'
import { Category } from '@/sanity.types'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import Container from "./Container";


interface Props {
  categories: Category[];
}

const HomeCategories = ({ categories }: Props) => {
  const maxProductCount = React.useMemo(() => {
    return Math.max(...(categories?.map((c) => c.productCount || 0) || []), 1);
  }, [categories]);

  const totalProducts = React.useMemo(() => {
    return categories?.reduce((sum, cat) => sum + (cat.productCount || 0), 0) || 0;
  }, [categories]);

  return (
    <Container className="mt-16 lg:mt-24">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-1 w-12 bg-gradient-to-r from-ushop-pink to-ushop-purple rounded-full"></div>
          <Title className="text-3xl lg:text-4xl font-bold text-dark-color">
            Popular Categories
          </Title>
          <div className="h-1 w-12 bg-gradient-to-l from-ushop-pink to-ushop-purple rounded-full"></div>
        </div>
        <p className="text-light-color text-lg max-w-2xl mx-auto">
          Explore our most popular product categories and find what you need
        </p>
        <Link
          href={"/category"}
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-ushop-pink/10 text-ushop-purple font-semibold rounded-full hover:bg-ushop-purple hover:text-white border-2 border-ushop-purple/20 hover:border-ushop-purple hoverEffect"
        >
          Browse All Categories
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

      {/* Categories Grid */}
      <div className="bg-gradient-to-br from-white via-ushop_light_bg to-ushop-pink/5 p-8 lg:p-12 rounded-3xl shadow-xl border border-ushop-purple/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories?.map((category, index) => (
            <Link
              key={category?._id}
              href={`/category/${category?.slug?.current}`}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-ushop-purple/20 hoverEffect transform hover:-translate-y-2 cursor-pointer block"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="flex justify-center mb-5">
                {category?.image && (
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-ushop-pink/10 to-ushop_light_bg p-3 group-hover:shadow-lg hoverEffect">
                    <Image
                      src={urlFor(category?.image).url()}
                      alt={`${category?.title} category`}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain group-hover:scale-110 hoverEffect"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ushop-purple/5 to-transparent opacity-0 group-hover:opacity-100 hoverEffect rounded-xl"></div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="text-center space-y-3">
                <h3 className="text-lg font-bold text-dark-color group-hover:text-ushop-purple-dark hoverEffect line-clamp-1">
                  {category?.title}
                </h3>

                <div className="flex items-center justify-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-ushop-pink rounded-full"></div>
                    <span className="text-sm font-semibold text-ushop-purple">
                      Explore
                    </span>
                  </div>
                  <span className="text-sm text-light-color">
                    this category
                  </span>
                </div>

                {/* Product Count Display */}
                <div className="space-y-1.5 mt-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-light-color font-medium">Products</span>
                    <span className="text-ushop-purple font-bold">
                      {category.productCount ?? 0} {category.productCount === 1 ? "Product" : "Products"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-ushop-pink to-ushop-purple h-full rounded-full hoverEffect"
                      style={{ width: `${((category.productCount || 0) / maxProductCount) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Shop Now Button */}
                <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-ushop-pink/10 to-ushop_light_bg text-ushop-purple font-medium rounded-full group-hover:from-ushop-purple group-hover:to-ushop-purple-dark group-hover:text-white text-sm hoverEffect">
                  Shop Now
                  <svg
                    className="w-3 h-3 hoverEffect group-hover:translate-x-1"
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
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Categories Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-ushop-purple/10">
          <div className="text-center">
            <div className="text-2xl font-bold text-ushop-purple">
              {categories?.length}+
            </div>
            <div className="text-sm text-light-color">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-ushop-purple">{totalProducts}</div>
            <div className="text-sm text-light-color">Products</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-ushop-purple">24/7</div>
            <div className="text-sm text-light-color">Support</div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-ushop-pink/5 to-ushop_light_bg rounded-2xl border border-ushop-purple/10">
            <div className="w-2 h-2 bg-ushop-pink rounded-full animate-pulse"></div>
            <span className="text-dark-text font-medium">
              Discover amazing products in every category
            </span>
            <div className="w-2 h-2 bg-ushop-pink rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </Container>
  );
};


export default HomeCategories