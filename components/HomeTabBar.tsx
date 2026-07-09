import Link from "next/link";
import React from "react";
import { productType } from "@/Constants/data";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabBar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-5">
      <div className="flex items-center gap-3 text-sm font-semibold">
        {productType?.map((item) => (
          <button
          onClick={() => onTabSelect(item?.title)}
            key={item?.title}
            className={`border border-ushop-pink/20 px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-ushop-pink hover:border-ushop-pink hover:text-white hoverEffect ${selectedTab === item?.title ? "bg-ushop-pink text-white border-ushop-pink" : "bg-ushop-pink/20"}`}
          >
            {item?.title}
          </button>
        ))}
      </div>
      <Link
        href={"/categories"}
        className={`border border-ushop-pink/20 px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-ushop-pink hover:border-ushop-pink hover:text-white hoverEffect`}
      >
        see all
      </Link>
    </div>
  );
};

export default HomeTabBar;
