"use client";
import { Product } from "@/sanity.types";
import useCartStore from "@/store";
import { Heart } from "lucide-react";
import BreadcrumbLink from "@/components/BreadcrumbLink";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import isArray from "js-isarray";
import _ from "lodash";
import { trackWishlistAdd, trackWishlistRemove } from "@/lib/analytics";


const AddToWishlistBtn = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product;
}) => {
  const { favoriteProduct, addToFavorite } = useCartStore();
  const existingProduct = _.find(
    favoriteProduct,
    (item) => item?._id === product?._id
  ) || null;

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product?._id) {
      const isRemoving = !!existingProduct;

      addToFavorite(product).then(() => {
        toast.success(
          isRemoving ? "Removed from wishlist" : "Added to wishlist",
          {
            description: isRemoving
              ? "Product removed successfully!"
              : "Product added successfully!",
            duration: 3000,
          }
        );

        // Track wishlist analytics
        if (isRemoving) {
          trackWishlistRemove({
            productId: product._id,
            name: product.name || "Unknown Product",
          });
        } else {
          trackWishlistAdd({
            productId: product._id,
            name: product.name || "Unknown Product",
          });
        }
      });
    }
  };
  return (
    <>
      {!showProduct ? (
        <BreadcrumbLink
          href={"/wishlist"}
          className="group relative hover:text-ushop-purple hoverEffect"
        >
          <Heart className="group-hover:text-ushop-purple hoverEffect mt-.5" />
          {/* {isArray(favoriteProduct) && favoriteProduct.length > 0 && ( */}
          <span
            className={`absolute -top-1 -right-1 bg-ushop-purple-dark text-white rounded-full text-xs font-semibold flex items-center justify-center min-w-[14px] h-[14px] ${
              favoriteProduct.length > 9 ? "px-1" : ""
            }`}
          >
            {/* {favoriteProduct.length > 9 ? "9+" : favoriteProduct.length} */}
            {isArray(favoriteProduct) && favoriteProduct.length > 0
              ? favoriteProduct.length > 9
                ? "9+"
                : favoriteProduct.length
              : 0}
          </span>
          {/* )} */}
        </BreadcrumbLink>
      ) : (
        <button
          onClick={handleFavorite}
          className="group relative hover:text-ushop-purple hoverEffect border border-ushop-purple/80 p-1.5 rounded-sm "
        >
          <Heart
            fill={existingProduct ? "#6B1FA8" : "#fff"}
            className="text-ushop-purple/80 group-hover:text-ushop-purple hoverEffect mt-.5"
          />
        </button>
      )}
    </>
  );
};

export default AddToWishlistBtn;