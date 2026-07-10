import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/sanity.types";
import Link from "next/link";
import { Flame } from "lucide-react";

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
            className="object-cover"
          />
        )}
        {product?.status === "sale" && (<p className="absolute top-2 left-2 z-10 text-xs border
         border-darkColoer/50 px-2 rounded-full 
         group-hover:border-ushop-pink hoverEffect">
          Sale!
          </p>
        )}
        {product?.status === "hot" && <Link
        href={"/deal"}
        className="absolute top-2 left-2 z-10 text-xs border
         border-ushop_orange/50 px-2 rounded-full 
         group-hover:border-ushop_orange hover:text-ushop-pink hoverEffect"
        >
          <Flame
          size={18}
          fill="#fb6c08"
          className="text-ushop_orange/50 group-hover:text-ushop-pink hoverEffect"
          />  
          </Link>}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-gray-500 mt-1">GH₵ {product.price?.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductCard