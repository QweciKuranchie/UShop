import React from 'react'
import { HeartIcon } from "lucide-react";
import Link from "next/link";

function WhishListIcon() {
  return (
    <Link href={"/wishlist"} className="group relative">
        <HeartIcon className="w-6 h-6 group-hover:text-ushop-purple hoverEffect" />
        <span className="absolute -top-1 -right-1 bg-ushop-red text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
            0
        </span>
    </Link>
  )
}

export default WhishListIcon