"use client";

import useCartStore from "@/store";
import Link from "next/link";
import React from "react";
import {ShoppingCartIcon } from "lucide-react";

const CartIcon = () => {
  const { items } = useCartStore();
  const itemCount = items?.length || 0;
  const displayCount = itemCount > 9 ? "9+" : itemCount;
  return (
    <Link href={"/cart"} className="group relative">
        <ShoppingCartIcon className="w-6 h-6 group-hover:text-ushop-purple hoverEffect" />
         {itemCount > 0 ? (
        <span
          className={`absolute -top-1 -right-1 bg-ushop-red text-white rounded-full text-xs font-semibold flex items-center justify-center min-w-[14px] h-[14px] ${
            itemCount > 9 ? "px-1" : ""
          }`}
        >
          {displayCount}
        </span>
      ) : (
        <span className="absolute -top-1 -right-1 bg-ushop-red text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
            0
        </span>
      )} 
    </Link>
  )
}

export default CartIcon