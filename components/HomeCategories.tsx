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
  const displayCategories = React.useMemo(() => {
    return categories?.filter(
      (c: Category) => c.featured === true || Boolean(c.image)
    );
  }, [categories]);

  const maxProductCount = React.useMemo(() => {
    return Math.max(...(displayCategories?.map((c) => c.productCount || 0) || []), 1);
  }, [displayCategories]);

  const totalProducts = React.useMemo(() => {
    return displayCategories?.reduce((sum, cat) => sum + (cat.productCount || 0), 0) || 0;
  }, [displayCategories]);

  if (!displayCategories || displayCategories.length === 0) {
    return null;
  }

  return (
    <Container className="mt-16 lg:mt-24">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-3 sm:mb-4">
          <div className="h-0.5 sm:h-1 w-8 sm:w-12 bg-gradient-to-r from-ushop-pink to-ushop-purple rounded-full"></div>
          <Title className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-dark-color">
            Popular Categories
          </Title>
          <div className="h-0.5 sm:h-1 w-8 sm:w-12 bg-gradient-to-l from-ushop-pink to-ushop-purple rounded-full"></div>
        </div>
        <p className="text-light-color text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
          Explore our most popular product categories and find what you need
        </p>
        <Link
          href={"/category"}
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-ushop-pink/10 text-ushop-pink font-semibold rounded-full hover:bg-ushop-pink hover:text-white border-2 border-ushop-pink/20 hover:border-ushop-pink hoverEffect"
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
      <div className="mt-8">
        <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-ushop-pink/40 scrollbar-track-transparent sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:pb-0">
          {displayCategories?.map((category, index) => (
            <Link
              key={category?._id}
              href={`/category/${category?.slug?.current}`}
              className="group bg-white rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-lg border border-gray-200/80 hover:border-ushop-pink/40 hoverEffect transform hover:-translate-y-1 cursor-pointer block min-w-[240px] sm:min-w-0 flex-shrink-0 snap-start"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="flex justify-center mb-4">
                {category?.image && (
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-ushop-pink/10 to-ushop_light_bg p-2.5 sm:p-3 group-hover:scale-105 hoverEffect">
                    <Image
                      src={urlFor(category?.image).url()}
                      alt={`${category?.title} category`}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain group-hover:scale-110 hoverEffect"
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="text-center space-y-2.5">
                <h3 className="text-base font-bold text-dark-color group-hover:text-ushop-pink hoverEffect line-clamp-1">
                  {category?.title}
                </h3>

                <div className="flex items-center justify-center gap-1.5 text-xs">
                  <div className="w-1.5 h-1.5 bg-ushop-pink rounded-full"></div>
                  <span className="font-semibold text-ushop-purple">
                    Explore
                  </span>
                  <span className="text-light-color">
                    category
                  </span>
                </div>

                {/* Product Count Display */}
                <div className="space-y-1.5 mt-2">
                  <div className="flex justify-between items-center text-[11px]">
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
                <div className="inline-flex items-center gap-1.5 mt-3 px-3.5 py-1.5 bg-gray-50 group-hover:bg-gradient-to-r group-hover:from-ushop-purple group-hover:to-ushop-purple-dark text-gray-700 group-hover:text-white font-semibold rounded-full text-xs hoverEffect transition-all border border-gray-100">
                  <span>Shop Now</span>
                  <svg
                    className="w-3 h-3 hoverEffect group-hover:translate-x-0.5"
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
        <div className="flex flex-wrap items-center justify-center gap-8 mt-10 pt-6 border-t border-gray-100">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-ushop-purple">
              {categories?.length}+
            </div>
            <div className="text-xs text-light-color">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-ushop-purple">{totalProducts}</div>
            <div className="text-xs text-light-color">Products</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-ushop-purple">24/7</div>
            <div className="text-xs text-light-color">Support</div>
          </div>
        </div>
      </div>
    </Container>
  );
};


export default HomeCategories