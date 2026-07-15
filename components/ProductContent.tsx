"use client";

import Container from "@/components/Container";
import PriceView from "@/components/PriceView";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import ProductsDetails from "@/components/ProductsDetails";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import ProductSpecs from "@/components/ProductSpecs";
import ProductReviews from "@/components/ProductReviews";
import AddToCartBtn from "@/components/AddToCartBtn";
import AddToWishlistBtn from "@/components/AddToWishlistBtn";

import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import {
  CornerDownLeft,
  StarIcon,
  Truck,
  Shield,
  RefreshCw,
  Palette,
  HelpCircle,
  Share2,
} from "lucide-react";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ProductAnimationWrapper,
  ProductImageWrapper,
  ProductDetailsWrapper,
  ProductActionWrapper,
  ProductSectionWrapper,
} from "@/components/ProductClientWrapper";
import RelatedProducts from "./RelatedProducts";
interface ProductContentProps {
  product: Product & {
    averageRating?: number;
    totalReviews?: number;
  };
  relatedProducts: Product[];
  brand: { brandName?: string }[] | null;
}

const ProductContent = ({
  product,
  relatedProducts,
  brand,
}: ProductContentProps) => {
  const averageRating = product?.averageRating || 0;
  const totalReviews = product?.totalReviews || 0;

  // Active image selector state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <ProductAnimationWrapper>
      <Container>
        {/* Breadcrumb Navigation */}
        <DynamicBreadcrumb
          productData={{
            name: product?.name || "",
            slug: product?.slug?.current || "",
          }}
        />

        <div className="flex flex-col md:flex-row gap-10 pb-6">
          {/* Product Image Gallery */}
          {product?.images && product.images.length > 0 && (
            <ProductImageWrapper>
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-ushop_light_bg border border-zinc-100 shadow-xs group">
                  <Image
                    src={urlFor(product.images[activeImageIndex]).url()}
                    alt={product.name || "Product Image"}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex flex-wrap gap-3">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 bg-ushop_light_bg hoverEffect ${
                          idx === activeImageIndex
                            ? "border-ushop-pink shadow-xs"
                            : "border-zinc-200/60 hover:border-zinc-300"
                        }`}
                      >
                        <Image
                          src={urlFor(img).url()}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </ProductImageWrapper>
          )}

          {/* Product Details */}
          <ProductDetailsWrapper>
            {/* Title and Category */}
            <div className="space-y-3">
              {brand && brand.length > 0 && (
                <Badge className="bg-ushop-pink/10 text-ushop-pink border border-ushop-pink/20 hover:bg-ushop-pink/20 w-fit">
                  <span className="font-semibold tracking-wide">
                    {brand[0]?.brandName}
                  </span>
                </Badge>
              )}
              <h1 className="text-3xl lg:text-4xl font-bold text-zinc-900 leading-tight">
                {product?.name}
              </h1>
              <p className="text-base text-zinc-600 leading-relaxed">
                {product?.description}
              </p>

              {/* Enhanced Rating Display */}
              {totalReviews > 0 ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        size={16}
                        className={`${
                          index < Math.floor(averageRating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-zinc-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-zinc-800">
                    {averageRating.toFixed(1)} ({totalReviews}{" "}
                    {totalReviews === 1 ? "review" : "reviews"})
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        size={16}
                        className="text-zinc-300"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-zinc-500">No reviews yet</span>
                </div>
              )}
            </div>

            {/* Pricing Section */}
            <div className="space-y-4 border-t border-b border-zinc-100 py-6">
              <PriceView
                price={product?.price}
                discount={product?.discount}
                className="text-3xl font-bold text-zinc-900"
              />

              {/* Enhanced Stock Status */}
              <div className="flex items-center gap-3">
                <Badge
                  className={`text-xs font-semibold px-2.5 py-1 ${
                    product?.stock === 0
                      ? "bg-red-50 text-red-700 border border-red-100"
                      : product?.stock && product.stock < 10
                      ? "bg-amber-50 text-amber-700 border border-amber-100"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                  }`}
                >
                  {product?.stock === 0
                    ? "Out of Stock"
                    : product?.stock && product.stock < 10
                    ? `Only ${product.stock} left!`
                    : "In Stock"}
                </Badge>
              </div>

              {/* Discount Information */}
              {product?.discount && product.discount > 0 && (
                <div className="bg-ushop-pink/10 text-ushop-pink border border-ushop-pink/20 px-3 py-2 rounded-lg text-sm font-semibold">
                  💰 Save {product.discount}% on this item!
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <ProductActionWrapper delay={0.3}>
              <div className="flex items-center gap-4">
                <AddToCartBtn product={product} className="flex-grow max-w-md py-3 text-base rounded-xl" />
                <AddToWishlistBtn product={product} className="!relative !top-0 !right-0 !z-0" />
              </div>
            </ProductActionWrapper>

            {/* Product Characteristics */}
            <ProductActionWrapper delay={0.4}>
              <ProductCharacteristics product={product} brand={brand} />
            </ProductActionWrapper>

            {/* Action Links */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 py-5">
              <button className="flex items-center gap-2 text-sm text-zinc-700 hover:text-ushop-pink hoverEffect transition-colors">
                <Palette size={16} />
                <span>Compare color</span>
              </button>
              <button className="flex items-center gap-2 text-sm text-zinc-700 hover:text-ushop-pink hoverEffect transition-colors">
                <HelpCircle size={16} />
                <span>Ask a question</span>
              </button>
              <button className="flex items-center gap-2 text-sm text-zinc-700 hover:text-ushop-pink hoverEffect transition-colors">
                <Truck size={16} />
                <span>Delivery & Return</span>
              </button>
              <button className="flex items-center gap-2 text-sm text-zinc-700 hover:text-ushop-pink hoverEffect transition-colors">
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>

            {/* Delivery Information */}
            <ProductActionWrapper delay={0.5}>
              <div className="flex flex-col border border-zinc-200/80 rounded-2xl overflow-hidden bg-white shadow-xs">
                <div className="p-4 flex items-start gap-3.5 border-b border-zinc-100">
                  <Truck size={24} className="text-ushop-pink mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-zinc-800">
                      Free Delivery
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Enter your Postal code for Delivery Availability.{" "}
                      <button className="underline hover:text-ushop-pink transition-colors font-medium">
                        Check now
                      </button>
                    </p>
                  </div>
                </div>
                <div className="p-4 flex items-start gap-3.5">
                  <CornerDownLeft size={24} className="text-ushop-pink mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-zinc-800">
                      Return Delivery
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Free 30 days Delivery Returns.{" "}
                      <button className="underline hover:text-ushop-pink transition-colors font-medium">
                        Details
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </ProductActionWrapper>
          </ProductDetailsWrapper>
        </div>

        {/* Product Details Section */}
        <ProductSectionWrapper delay={0.6}>
          <ProductsDetails />
        </ProductSectionWrapper>

        {/* Trust Indicators & Guarantees */}
        <ProductSectionWrapper delay={0.7}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
            <Card className="border border-zinc-100 text-center p-5 rounded-2xl shadow-xs">
              <Shield className="h-7 w-7 text-ushop-pink mx-auto mb-3" />
              <h3 className="font-semibold text-zinc-800 text-sm mb-1">
                Secure Payment
              </h3>
              <p className="text-xs text-zinc-500">
                100% secure payment with SSL encryption
              </p>
            </Card>

            <Card className="border border-zinc-100 text-center p-5 rounded-2xl shadow-xs">
              <Truck className="h-7 w-7 text-ushop-pink mx-auto mb-3" />
              <h3 className="font-semibold text-zinc-800 text-sm mb-1">
                Fast Delivery
              </h3>
              <p className="text-xs text-zinc-500">
                Free shipping on orders over $50
              </p>
            </Card>

            <Card className="border border-zinc-100 text-center p-5 rounded-2xl shadow-xs">
              <RefreshCw className="h-7 w-7 text-ushop-pink mx-auto mb-3" />
              <h3 className="font-semibold text-zinc-800 text-sm mb-1">
                Easy Returns
              </h3>
              <p className="text-xs text-zinc-500">
                30-day hassle-free returns
              </p>
            </Card>
          </div>
        </ProductSectionWrapper>

        {/* Product Specifications */}
        <ProductSectionWrapper delay={0.8}>
          <ProductSpecs product={product} />
        </ProductSectionWrapper>

        {/* Customer Reviews */}
        <ProductSectionWrapper delay={0.9}>
          <ProductReviews
            productId={product._id}
            productName={product.name || "this product"}
          />
        </ProductSectionWrapper>

        {/* Related Products */}
        <ProductSectionWrapper delay={1.0}>
          <RelatedProducts
            currentProduct={product}
            relatedProducts={relatedProducts}
          />
        </ProductSectionWrapper>
      </Container>
    </ProductAnimationWrapper>
  );
};

export default ProductContent;
