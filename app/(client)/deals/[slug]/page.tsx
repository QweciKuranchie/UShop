import Container from "@/components/Container";
import Title from "@/components/Title";
import DealCountdown from "@/components/DealCountdown";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import PaginatedProductGrid from "@/components/PaginatedProductGrid";
import { Product } from "@/sanity.types";
import { getDealProducts, getAllProducts } from "@/sanity/Queries";
import {
  Zap,
  GraduationCap,
  Tag,
  ShoppingBag,
  Sparkles,
  Package,
  ArrowLeft,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

const DEAL_CATEGORIES: Record<
  string,
  {
    title: string;
    subtitle: string;
    badgeText: string;
    maxDiscount: string;
    bgGradient: string;
    icon: LucideIcon;
  }
> = {
  flash: {
    title: "Flash Sales",
    subtitle: "Limited-time lightning deals with massive price drops up to 90% off. Grab yours before stock runs out!",
    badgeText: "FLASH SALE — UP TO 90% OFF",
    maxDiscount: "Up to 90% OFF",
    bgGradient: "from-ushop-red via-red-600 to-amber-600",
    icon: Zap,
  },
  students: {
    title: "Student Deals",
    subtitle: "Verified campus pricing on laptops, accessories, tech gadgets & student essentials up to 90% off.",
    badgeText: "STUDENT EXCLUSIVE — UP TO 90% OFF",
    maxDiscount: "Up to 90% OFF",
    bgGradient: "from-emerald-700 via-teal-600 to-ushop-pink",
    icon: GraduationCap,
  },
  clearance: {
    title: "Clearance Sale",
    subtitle: "Final markdown on warehouse stock and last-chance items with discounts up to 50% off.",
    badgeText: "CLEARANCE — UP TO 50% OFF",
    maxDiscount: "Up to 50% OFF",
    bgGradient: "from-amber-600 via-orange-600 to-red-600",
    icon: Tag,
  },
  "black-friday": {
    title: "Black Friday Mega Deals",
    subtitle: "The biggest shopping event of the year! Enjoy doorbuster discounts across all departments.",
    badgeText: "BLACK FRIDAY MEGA DEALS",
    maxDiscount: "Up to 90% OFF",
    bgGradient: "from-gray-950 via-gray-900 to-ushop-red",
    icon: ShoppingBag,
  },
  "special-offers": {
    title: "Special Offers",
    subtitle: "Hand-picked seller promotions, bundle discounts, and seasonal price drops on UShop.",
    badgeText: "SPECIAL OFFERS",
    maxDiscount: "Exclusive Savings",
    bgGradient: "from-ushop-purple via-ushop-pink to-red-500",
    icon: Sparkles,
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dealInfo = DEAL_CATEGORIES[slug.toLowerCase()];

  if (!dealInfo) {
    return {
      title: "Deals | UShop",
    };
  }

  return {
    title: `${dealInfo.title} | ${dealInfo.maxDiscount} | UShop`,
    description: dealInfo.subtitle,
  };
}

const SingleDealCategoryPage = async ({ params }: Props) => {
  const { slug } = await params;
  const dealKey = slug.toLowerCase();
  const dealInfo = DEAL_CATEGORIES[dealKey];

  if (!dealInfo) {
    return notFound();
  }

  // Fetch deal products and all products fallback
  const [dealProducts, allProducts] = await Promise.all([
    getDealProducts(),
    getAllProducts(),
  ]);

  const rawProducts = (dealProducts && dealProducts.length > 0 ? dealProducts : allProducts) as unknown as Product[];

  // Filter products relevant to the deal category
  let filteredProducts: Product[] = [];

  if (dealKey === "flash") {
    filteredProducts = rawProducts.filter((p) => p.isFlashSale || p.status === "hot" || (p.discount && p.discount >= 20));
  } else if (dealKey === "students") {
    filteredProducts = rawProducts.filter((p) => Boolean(p.discount || p.isFlashSale || p.featured));
  } else if (dealKey === "clearance") {
    filteredProducts = rawProducts.filter((p) => (p.discount && p.discount > 0) || (p.status as string) === "refurbished" || p.status === "good");
  } else if (dealKey === "black-friday") {
    filteredProducts = rawProducts.filter((p) => Boolean(p.discount || p.isFlashSale || p.status === "hot"));
  } else {
    filteredProducts = rawProducts.filter((p) => Boolean(p.discount || p.featured || p.isFlashSale));
  }

  // If filtered set is small, fallback to all available deal products
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : rawProducts;
  const IconComp = dealInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50/50 py-6">
      <Container>
        {/* Breadcrumb */}
        <DynamicBreadcrumb
          customItems={[
            { label: "Deals", href: "/deals" },
            { label: dealInfo.title, href: `/deals/${slug}` },
          ]}
        />

        {/* Hero Header Banner */}
        <div className={`my-6 bg-gradient-to-r ${dealInfo.bgGradient} text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative`}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full mb-4">
                <IconComp className="w-4 h-4 fill-white text-white" />
                <span className="text-xs font-black uppercase tracking-wider">
                  {dealInfo.badgeText}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
                {dealInfo.title}
              </h1>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-6">
                {dealInfo.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/deals"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold rounded-xl transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>All Deals Hub</span>
                </Link>
              </div>
            </div>

            {/* Countdown Box */}
            <div className="w-full lg:w-auto bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-3xl shrink-0">
              <DealCountdown />
            </div>
          </div>
        </div>

        {/* Catalog Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
            <div>
              <Title className="text-xl sm:text-2xl font-bold text-gray-900">
                {dealInfo.title} Collection
              </Title>
              <p className="text-xs text-gray-500 mt-0.5">
                Showing {displayProducts.length} items on sale.
              </p>
            </div>
          </div>

          {displayProducts && displayProducts.length > 0 ? (
            <PaginatedProductGrid products={displayProducts} initialLimit={12} incrementBy={12} />
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-md mx-auto my-10 shadow-xs">
              <Package className="w-12 h-12 text-ushop-pink/40 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">No Items Found</h3>
              <p className="text-xs text-gray-500 mb-6">
                Check back soon or explore other deal categories!
              </p>
              <Link
                href="/deals"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-ushop-pink hover:bg-ushop-pink/90 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Back to All Deals
              </Link>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default SingleDealCategoryPage;
