import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/sanity.types";
import Link from "next/link";
import { Flame, StarIcon } from "lucide-react";
import AddToWishlistBtn from "./AddToWishlistBtn";
import { Title } from "./ui/text";
import PriceView from "./PriceView";
import AddToCartBtn from "./AddToCartBtn";

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  new: {
    label: "NEW",
    className: "bg-emerald-100 text-emerald-700 border-emerald-300 group-hover:border-emerald-400",
  },
  refurbished: {
    label: "REFURBISHED",
    className: "bg-blue-100 text-blue-700 border-blue-300 group-hover:border-blue-400",
  },
  like_new: {
    label: "LIKE NEW",
    className: "bg-teal-100 text-teal-700 border-teal-300 group-hover:border-teal-400",
  },
  excellent: {
    label: "EXCELLENT",
    className: "bg-cyan-100 text-cyan-700 border-cyan-300 group-hover:border-cyan-400",
  },
  good: {
    label: "GOOD",
    className: "bg-gray-100 text-gray-700 border-gray-300 group-hover:border-gray-400",
  },
  fair: {
    label: "FAIR",
    className: "bg-amber-100 text-amber-700 border-amber-300 group-hover:border-amber-400",
  },
  for_parts: {
    label: "FOR PARTS",
    className: "bg-red-100 text-red-700 border-red-300 group-hover:border-red-400",
  },
};

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  isFlashSale?: boolean;
}

const ProductCard = ({ product, priority = false, isFlashSale = false }: ProductCardProps) => {
  const isHotOrFlash = isFlashSale || Boolean(product?.isFlashSale) || product?.status === "hot";

  return (
    <div className="text-sm border-[1px] border-dark-blue/20 rounded-md bg-white group">
      <div className="relative group overflow-hidden bg-ushop_light_bg">
        {product?.images && product.images[0] && (
          <Link href={`/product/${product?.slug?.current}`} aria-label={product.name || "View product"} title={product.name || "View product"}>
          <Image
            src={urlFor(product.images[0]).url()}
            alt={product.name || "Product Image"}
            priority={priority}
            width={700}
            height={700}
            className={`w-full h-44 sm:h-52 md:h-64 object-cover overflow-hidden transition-transform
               bg-ushop_light_bg hoverEffect
                ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
          />
          </Link>
        )}
        {/* Top-right action icons container (Wishlist + Flame icon if Flash Sale) */}
        <div className="absolute top-2 right-2 z-10 flex flex-col items-center gap-1.5">
          <AddToWishlistBtn product={product} />
          {isHotOrFlash && (
            <Link
              href="/deals"
              aria-label="Flash Deal"
              title="Flash Deal"
              className="p-1.5 rounded-full bg-white/95 shadow-md border border-red-100 hover:scale-110 transition-transform duration-200"
            >
              <Flame
                size={16}
                className="text-ushop-red fill-ushop-red animate-pulse"
              />
            </Link>
          )}
        </div>

        {/* Top-left status badge (if not flash sale or if normal status exists) */}
        {!product?.isFlashSale && product?.status && STATUS_CONFIG[product.status] && (
          <span
            className={`absolute top-2 left-2 z-10 text-xs border px-2 py-0.5 rounded-full font-medium tracking-wider hoverEffect ${STATUS_CONFIG[product.status].className}`}
          >
            {STATUS_CONFIG[product.status].label}
          </span>
        )}

        {/* Discount Tag */}
        {typeof product?.discount === "number" && product.discount > 0 ? (
          <div
            className={`absolute left-2 z-10 bg-ushop-pink/10 text-ushop-pink border border-ushop-pink/20 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-lg hoverEffect ${
              !product?.isFlashSale && product?.status ? "top-8" : "top-2"
            }`}
          >
            -{product.discount}%
          </div>
        ) : null}
      </div>
      <div className="p-3 flex flex-col gap-2">
        {(() => {
          const prod = product as { category?: { title?: string; name?: string } | string; categories?: unknown[] };
          const hasCategory = prod?.category || (prod?.categories && prod.categories.length > 0);
          if (!hasCategory) return null;

          let categoryLabel = "";
          if (typeof prod?.category === "object" && prod.category !== null) {
            categoryLabel = prod.category.title || prod.category.name || "";
          } else if (typeof prod?.category === "string") {
            categoryLabel = prod.category;
          } else if (Array.isArray(prod?.categories)) {
            categoryLabel = prod.categories
              .map((cat: unknown) => {
                if (typeof cat === "string") return cat;
                if (cat && typeof cat === "object") {
                  const obj = cat as { title?: string; name?: string };
                  return obj.title || obj.name || "";
                }
                return "";
              })
              .filter(Boolean)
              .join(", ");
          }

          if (!categoryLabel) return null;

          return (
            <p className="uppercase line-clamp-1 text-xs text-ushop-light-text">
              {categoryLabel}
            </p>
          );
        })()}
      <Title className="text-base md:text-base line-clamp-1 text-ushop-purple-dark ">{product?.name}</Title>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, index) => (
            <StarIcon 
            key={index} 
            size={12}
            className={index < 4 ?
              "text-ushop-lighter-pink"
              :
              "text-ushop-lighter-text"
            }
            
            fill={index < 4 ? "#db2777" : "#ababab"}
             />
          ))}
        </div>
        <p className="text-xs text-ushop-light-text tracking-wide">5 Reviews</p>
      </div>
      <div className="flex items-center gap-2.5">
        <p className="font-medium">Stock</p>
        <p className={` ${product?.stock === 0 ? "text-ushop-red font-semibold" : "text-ushop-purple font-semibold"}`}>{(product?.stock as number) > 0 ? `(${product?.stock})` : "Out of Stock"} </p>
      </div>
      <PriceView 
      price={product?.price} 
      discount={product?.discount}
      className="text-sm"
      />
      <AddToCartBtn product={product} className="w-full rounded-full"/>
      </div>
    </div>
  );
};

export default ProductCard;
