import Container from "./Container";
import { getAllBrands } from "@/sanity/queries";
import Title from "./Title";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const ShopByBrands = async () => {
  const brands = await getAllBrands();

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
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-ushop-pink/10 text-ushop-purple font-semibold rounded-full hover:bg-ushop-purple hover:text-white border-2 border-ushop-purple/20 hover:border-ushop-purple hoverEffect"
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
      <div className="bg-gradient-to-br from-ushop_light_bg via-white to-ushop-pink/5 p-8 lg:p-12 rounded-3xl shadow-xl border border-ushop-purple/10 mb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
          {brands?.map((brand, index) => (
            <Link
              key={brand?._id}
              href={`/brands/${brand?.slug?.current}`}
              className="group bg-white rounded-2xl p-6 flex items-center justify-center aspect-square hover:shadow-2xl shadow-lg border border-gray-100 hover:border-ushop-purple/30 hoverEffect transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {(() => {
                const brandImg = (brand as Record<string, unknown>).image || (brand as Record<string, unknown>).logo;
                return brandImg ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={urlFor(brandImg).url()}
                      alt={`${brand?.name || "Brand"} logo`}
                      width={120}
                      height={80}
                      className="max-w-full max-h-full object-contain group-hover:scale-110 hoverEffect filter group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ushop-pink/5 to-transparent opacity-0 group-hover:opacity-100 hoverEffect rounded-xl"></div>
                  </div>
                ) : null;
              })()}
            </Link>
          ))}
        </div>

        {/* Brand Grid Footer */}
        <div className="text-center mt-8 pt-6 border-t border-ushop-purple/10">
          <p className="text-dark-text text-sm">
            <span className="font-semibold text-ushop-pink">
              {brands?.length}+
            </span>{" "}
            trusted brands and counting
          </p>
        </div>
      </div>
    </Container>
  );
};

export default ShopByBrands;

