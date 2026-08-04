import Container from "./Container";
import { getAllBrands } from "@/sanity/Queries";
import Title from "./Title";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Brand } from "@/sanity.types";

const ShopByBrands = async () => {
  const allBrands: Brand[] = await getAllBrands();
  const displayBrands = allBrands?.filter(
    (b: Brand) => b.featured === true || Boolean(b.image || b.logo)
  );

  if (!displayBrands || displayBrands.length === 0) {
    return null;
  }

  return (
    <Container className="mt-16 lg:mt-24">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-1 w-12 bg-gradient-to-r from-ushop-pink to-ushop-purple rounded-full"></div>
          <Title className="text-3xl lg:text-4xl font-bold text-dark-color">
            Shop By Brands
          </Title>
          <div className="h-1 w-12 bg-gradient-to-l from-ushop-pink to-ushop-purple rounded-full"></div>
        </div>
        <p className="text-light-color text-lg max-w-2xl mx-auto">
          Discover products from your favorite trusted brands
        </p>
        <Link
          href={"/brands"}
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-ushop-pink/10 text-ushop-pink font-semibold rounded-full hover:bg-ushop-pink hover:text-white border-2 border-ushop-pink/20 hover:border-ushop-pink hoverEffect"
        >
          Explore All Brands
          <svg
            className="w-4 h-4 hoverEffect group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>

      {/* Brands Grid */}
      <div className="bg-gradient-to-br from-ushop_light_bg via-white to-ushop-pink/5 p-8 lg:p-12 rounded-3xl shadow-xl border border-ushop-pink/10 mb-16">
        <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-ushop-pink/40 scrollbar-track-transparent sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 sm:pb-0">
          {displayBrands?.map((brand, index) => (
            <Link
              key={brand?._id}
              href={`/brands/${brand?.slug?.current}`}
              className="group bg-white rounded-2xl p-6 flex items-center justify-center aspect-square hover:shadow-2xl shadow-lg border border-gray-100 hover:border-ushop-pink/40 hoverEffect transform hover:-translate-y-2 min-w-[120px] sm:min-w-0 flex-shrink-0 snap-start"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {(() => {
                const brandImg = (brand as Record<string, unknown>).image || (brand as Record<string, unknown>).logo;
                return brandImg ? (
                  <div className="relative w-full h-full flex items-center justify-center p-1">
                    <Image
                      src={urlFor(brandImg).url()}
                      alt={`${brand?.name || "Brand"} logo`}
                      fill
                      sizes="(max-width: 768px) 33vw, 15vw"
                      className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-1">
                    <div className="w-10 h-10 rounded-full bg-ushop-pink/10 text-ushop-pink font-extrabold flex items-center justify-center text-sm mb-1.5 group-hover:bg-ushop-pink group-hover:text-white transition-colors shadow-2xs">
                      {brand?.name?.charAt(0) || "B"}
                    </div>
                    <span className="text-xs font-bold text-gray-800 group-hover:text-ushop-pink transition-colors line-clamp-2 leading-tight">
                      {brand?.name}
                    </span>
                  </div>
                );
              })()}
            </Link>
          ))}
        </div>

        {/* Brand Grid Footer */}
        <div className="text-center mt-8 pt-6 border-t border-ushop-purple/10">
          <p className="text-dark-text text-sm">
            <span className="font-semibold text-ushop-pink">
              {displayBrands?.length}+
            </span>{" "}
            trusted brands and counting
          </p>
        </div>
      </div>
    </Container>
  );
};

export default ShopByBrands;

