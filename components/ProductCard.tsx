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

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm border-[1px] border-dark-blue/20 rounded-md bg-white group">
      <div className="relative group overflow-hidden bg-ushop_light_bg">
        {product?.images && product.images[0] && (
          <Image
            src={urlFor(product.images[0]).url()}
            alt={product.name || "Product Image"}
            loading="lazy"
            width={700}
            height={700}
            className={`w-full h-52 md:h-64 object-cover overflow-hidden transition-transform
               bg-ushop_light_bg hoverEffect
                ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
          />
        )}
        <AddToWishlistBtn product={product} />
        {product?.status === "new" && (
          <p
            className="absolute top-2 left-2 z-10 text-xs border
         border-emerald-300 px-2 rounded-full 
         group-hover:border-emerald-300 hoverEffect bg-emerald-100 text-emerald-700 "
          >
            NEW
          </p>
        )}
         {product?.status === "like_new" && (
          <p
            className="absolute top-2 left-2 z-10 text-xs border
         border-emerald-300 px-2 rounded-full 
         group-hover:border-emerald-300 hoverEffect bg-emerald-100 text-emerald-700 "
          >
            LIKE-NEW
          </p>
        )}
        {product?.status === "excellent" && (
          <p
            className="absolute top-2 left-2 z-10 text-xs border
         border-blue-300 px-2 rounded-full 
         group-hover:border-blue hoverEffect bg-blue-100 text-blue-700 "
          >
            EXCELLENT
          </p>
        )}
        {product?.status === "good" && (
          <p
            className="absolute top-2 left-2 z-10 text-xs border
         border-gray-300 px-2 rounded-full 
         group-hover:border-gray-300 hoverEffect bg-gray-100 text-gray-700 "
          >
            GOOD
          </p>
        )}
        {product?.status === "fair" && (
          <p
            className="absolute top-2 left-2 z-10 text-xs border
         border-amber-300 px-2 rounded-full 
         group-hover:border-amber-300 hoverEffect bg-amber-100 text-amber-700 "
          >
            FAIR
          </p>
        )}
        {product?.status === "for_parts" && (
          <p
            className="absolute top-2 left-2 z-10 text-xs border
         border-red-300 px-2 rounded-full 
         group-hover:border-red-300 hoverEffect bg-red-100 text-red-700 "
          >
            FOR PARTS
          </p>
        )}
        {product?.status === "hot" && (
          <Link
            href={"/deal"}
            className="absolute top-2 left-2 z-10 text-xs border
         border-ushop_orange/50 px-2 rounded-full 
         group-hover:border-ushop_orange hover:text-ushop-pink hoverEffect"
          >
            <Flame
              size={18}
              fill="#fb6c08"
              className="text-ushop_orange/50 group-hover:text-ushop_orange hoverEffect"
            />
          </Link>
        )}
        {product?.discount && product.discount > 0 ? (
          <div
            className={`absolute left-2 z-10 bg-ushop-pink/10 text-ushop-pink border border-ushop-pink/20 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-lg hoverEffect ${
              product?.status ? "top-8" : "top-2"
            }`}
          >
            -{product.discount}%
          </div>
        ) : null}
      </div>
      <div className="p-3 flex flex-col gap-2">
        {product?.categories && 
        ( <p className="uppercase line-clamp-1 text-xs text-ushop-light-text"
        >
          {product.categories.map((cat) => cat).join(", ")}
        </p>
      )}
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
