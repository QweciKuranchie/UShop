import Container from "@/components/Container";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import Title from "@/components/Title";
import { getStores } from "@/sanity/Queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import {
  Store as StoreIcon,
  CheckCircle2,
  MapPin,
  Star,
  Package,
  ArrowRight,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seller Stores & Verified Merchants | UShop",
  description: "Browse verified seller stores, merchant shops, and trusted vendors on UShop.",
};

const StoresPage = async () => {
  const storesList = await getStores();

  return (
    <div className="min-h-screen bg-gray-50/50 py-6">
      <Container>
        {/* Breadcrumb Navigation */}
        <DynamicBreadcrumb
          customItems={[{ label: "Stores", href: "/stores" }]}
        />

        {/* Hero Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xs border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-ushop-pink/10 text-ushop-pink text-xs font-semibold rounded-full mb-3">
              <StoreIcon className="w-4 h-4" /> Verified Merchant Stores
            </span>
            <Title className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
              Seller Stores & Vendor Marketplace
            </Title>
            <p className="text-gray-600 text-sm max-w-xl">
              Shop directly from verified sellers, brand stores, and merchant vendors on UShop.
            </p>
          </div>

          <div className="bg-ushop-pink/5 border border-ushop-pink/20 rounded-2xl p-5 text-center min-w-[220px]">
            <div className="text-3xl font-extrabold text-ushop-pink mb-1">
              {storesList?.length || 0}
            </div>
            <div className="text-xs font-medium text-gray-700">
              Active Merchant Stores
            </div>
          </div>
        </div>

        {/* Stores Grid or Empty State */}
        {storesList && storesList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {storesList.map((store: any) => {
              const logoUrl = store.logo ? urlFor(store.logo).url() : null;
              const slug = store.slug?.current || "";

              return (
                <div
                  key={store._id}
                  className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs hover:shadow-md hover:border-ushop-pink/30 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Store Header Info */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative w-14 h-14 rounded-2xl bg-ushop-pink/10 border border-ushop-pink/20 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs group-hover:scale-105 transition-transform">
                        {logoUrl ? (
                          <Image
                            src={logoUrl}
                            alt={store.name || "Store Logo"}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <StoreIcon className="w-7 h-7 text-ushop-pink" />
                        )}
                      </div>

                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <h3 className="font-bold text-gray-900 text-base truncate group-hover:text-ushop-pink transition-colors">
                            {store.name}
                          </h3>
                          {store.verifiedSeller && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-50 shrink-0" />
                          )}
                        </div>

                        {store.ownerName && (
                          <p className="text-xs text-gray-500 truncate mb-1">
                            Owner: <span className="font-medium text-gray-700">{store.ownerName}</span>
                          </p>
                        )}

                        {/* Location Tag */}
                        {store.location?.name && (
                          <div className="flex flex-wrap gap-1.5 text-xs">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md font-medium text-[11px]">
                              <MapPin className="w-3 h-3 text-ushop-pink" />
                              {store.location.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Store Description */}
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                      {store.description || "Verified merchant store on UShop."}
                    </p>
                  </div>

                  {/* Footer Metrics & Action */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1 font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {store.rating || 5.0}
                      </span>

                      <span className="flex items-center gap-1 text-gray-600">
                        <Package className="w-3.5 h-3.5 text-zinc-400" />
                        {store.productCount || 0} products
                      </span>
                    </div>

                    <Link
                      href={`/stores/${slug}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-ushop-purple hover:bg-ushop-purple-dark text-white text-xs font-semibold rounded-xl transition-all shadow-2xs group-hover:gap-2"
                    >
                      <span>Visit Store</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-md mx-auto my-12 shadow-xs">
            <StoreIcon className="w-12 h-12 text-ushop-pink/40 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No Stores Found
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              There are currently no active merchant stores registered in Sanity. Registered seller stores will appear here.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default StoresPage;
