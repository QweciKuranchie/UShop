"use client";

import Link from "next/link";
import React from "react";
import { Flame } from "lucide-react";
import { headerData } from "@/Constants/data";
import { usePathname } from "next/navigation";

const HeaderNavBar = () => {
    const pathname = usePathname();
    
  return (
    <div className="border-t border-gray-100">
      {/* ── Row 3: Navigation bar ── */}
      <div className="max-w-7xl mx-auto px-4 hidden md:block">
        <nav
          className="flex items-center justify-between py-2"
          aria-label="Main navigation"
        >
          <div className="flex flex-row items-center gap-6">
            {/* Navigation links — Only shown on desktop */}
            {headerData?.map((item) => (
              <Link
                key={item?.title}
                href={item?.href}
                className={`text-sm capitalize font-semibold text-gray-700 hover:text-ushop-pink hoverEffect relative group ${
                  pathname === item?.href && "text-ushop-pink"
                }`}
              >
                {item.title}
                <span className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-ushop-pink group-hover:w-12 hoverEffect group-hover:left-0 ${
                  pathname === item?.href && "text-ushop-purple"
                }`}/>
                <span className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-ushop-pink group-hover:w-12 hoverEffect group-hover:right-0 ${
                  pathname === item?.href && "text-ushop-pink"
                }`}/>
              </Link>
            ))}
          </div>

          {/* Student Deals — highlighted */}
          <Link
            href="/deals"
            className="flex items-center gap-1 text-sm font-bold text-[#E8000B] hover:text-ushop-red transition-colors py-1"
          >
            <Flame className="w-4 h-4 mb-0.5" />
            Hot Deals
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default HeaderNavBar;
