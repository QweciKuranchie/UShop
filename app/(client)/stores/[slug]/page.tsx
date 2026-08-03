import Container from "@/components/Container";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import ProductCard from "@/components/ProductCard";
import PaginatedProductGrid from "@/components/PaginatedProductGrid";
import Title from "@/components/Title";
import { getSingleStoreBySlug, getProductsByStoreSlug } from "@/sanity/Queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Store as StoreIcon,
  CheckCircle2,
  MapPin,
  Star,
  Package,
  ArrowLeft,
  UserCheck,
} from "lucide-react";
import { Metadata } from "next";
import { Product } from "@/sanity.types";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const store = await getSingleStoreBySlug(slug);

  if (!store) {
    return {
      title: "Store Not Found | UShop",
    };
  }

  return {
    title: `${store.name} | Verified Seller Store | UShop`,
    description: store.description || `Browse products offered by ${store.name} on UShop.`,
  };
}

const SingleStorePage = async ({ params }: Props) => {
  const { slug } = await params;

  const [store, fetchedProducts] = await Promise.all([
    getSingleStoreBySlug(slug),
    getProductsByStoreSlug(slug),
  ]);

  if (!store) {
    return notFound();
  }

  const logoUrl = store.logo ? urlFor(store.logo).url() : null;
  const bannerUrl = store.banner ? urlFor(store.banner).url() : null;
  const products = (fetchedProducts || []) as unknown as Product[];

  return (
    <div className="min-h-screen bg-gray-50/50 py-6">
      <Container>
        {/* Breadcrumb */}
        <DynamicBreadcrumb
          customItems={[
            { label: "Stores", href: "/stores" },
            { label: store.name, href: `/stores/${slug}` },
          ]}
        />

        {/* Store Banner & Hero Card */}
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xs mb-10">
          {/* Cover Header */}
          <div className="relative h-44 sm:h-64 w-full bg-gradient-to-r from-ushop-purple via-ushop-pink to-amber-500 overflow-hidden">
            {bannerUrl ? (
              <Image
                src={bannerUrl}
                alt={store.name}
                fill
                className="object-cover opacity-80"
              />
            ) : (
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Store Info Bar */}
          <div className="relative px-6 sm:px-10 pb-8 pt-0 -mt-12 sm:-mt-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              {/* Store Logo */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-1.5 shadow-lg border-2 border-white shrink-0 overflow-hidden">
                <div className="relative w-full h-full rounded-xl bg-ushop-pink/10 flex items-center justify-center overflow-hidden">
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={store.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <StoreIcon className="w-12 h-12 text-ushop-pink" />
                  )}
                </div>
              </div>

              {/* Store Titles */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    {store.name}
                  </h1>
                  {store.verifiedSeller && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50 shrink-0" />
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-2">
                  {store.ownerName && (
                    <span className="flex items-center gap-1 font-medium">
                      <UserCheck className="w-3.5 h-3.5 text-ushop-pink" />
                      {store.ownerName}
                    </span>
                  )}

                  {store.location?.name && (
                    <span className="flex items-center gap-1 font-medium bg-gray-100 px-2 py-0.5 rounded-md">
                      <MapPin className="w-3.5 h-3.5 text-ushop-pink" />
                      {store.location.name}
                    </span>
                  )}

                  <span className="flex items-center gap-1 font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {store.rating || 5.0} Rating
                  </span>
                </div>

                <p className="text-xs text-gray-600 max-w-2xl leading-relaxed">
                  {store.description || "Verified merchant store on UShop."}
                </p>
              </div>
            </div>

            {/* Back to Stores Link */}
            <Link
              href="/stores"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Stores</span>
            </Link>
          </div>
        </div>

        {/* Store Catalog Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <Title className="text-xl sm:text-2xl font-bold text-gray-900">
              Products from {store.name}
            </Title>
            <p className="text-xs text-gray-500 mt-1">
              Showing {products.length} {products.length === 1 ? "item" : "items"} available.
            </p>
          </div>
        </div>

        {/* Products Grid or Empty State */}
        {products && products.length > 0 ? (
          <div className="mb-16">
            <PaginatedProductGrid products={products} initialLimit={12} incrementBy={12} />
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-md mx-auto my-12 shadow-xs">
            <Package className="w-12 h-12 text-ushop-pink/40 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No Products Listed Currently
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              This store has not posted any active products yet. Check back soon or explore other merchant stores.
            </p>
            <Link
              href="/stores"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-ushop-purple hover:bg-ushop-purple-dark text-white text-xs font-semibold rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Browse Other Stores</span>
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default SingleStorePage;
