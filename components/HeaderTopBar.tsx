import Link from "next/link";
import React from "react";
import { Phone } from "lucide-react";

const HeaderTopBar = () => {
  return (
    <div className="bg-[#0f172a] text-white text-xs">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href="tel:+233509565794"
            className="flex items-center gap-1 hover:text-gray-300 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">+233 50 956 5794</span>
          </a>
          <span className="text-gray-600 hidden sm:inline">|</span>
          <a
            href="mailto:support@ushop.com"
            className="hover:text-gray-300 transition-colors hidden sm:inline"
          >
            support@ushop.com
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/store/create"
            className="hover:text-gray-300 transition-colors"
          >
            Sell on U-Shop
          </Link>
          <span className="text-gray-600 hidden sm:inline">|</span>
          {/* "My Orders" navigates to the orders sub-page that exists,
                not /dashboard which is the generic overview. */}
          <Link
            href="/orders"
            className="font-bold hover:text-gray-300 transition-colors hidden sm:inline"
          >
            Track Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderTopBar;