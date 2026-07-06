import React from "react";
import Title from "./ui/text";
import Link from "next/link";
import Image from "next/image";

function HomeBanner() {
  return (
    <div className="py-16 md:py-0 bg-gradient-to-r from-ushop-purple via-[#151515] via-40% to-[#151515] rounded-lg px-10 lg:px-24 flex items-center justify-between">
      <div className="space-y-5">
        <Title>
          50% Off <br /> Flash Sales
        </Title>
        <Link
          href={"/deals"}
          className="bg-ushop-magenta/90 text-white/90 px-5 py-2 rounded-md text-sm font-semibold hover:text-white hover:bg-ushop-pink hoverEffect"
        >
          Shop Now
        </Link>
      </div>
      <div>
        <Image
          src="/assets/images/hero/homepage.png"
          alt="banner 1"
          width={500}
          height={500}
          className="hidden md:inline-flex w-96"
        />
      </div>
    </div>
  );
} 

export default HomeBanner;
