import Link from "next/link";
import React from "react";
import {ShoppingCartIcon } from "lucide-react";

function CartIcon() {
  return (
    <Link href={"/cart"} className="group relative">
        <ShoppingCartIcon className="w-6 h-6 group-hover:text-ushop-purple hoverEffect" />
        <span className="absolute -top-1 -right-1 bg-ushop-red text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
            0
        </span>
    </Link>
  )
}

export default CartIcon