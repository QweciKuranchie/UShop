import Container from "@/components/Container";
import Title from "@/components/Title";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import PaginatedProductGrid from "@/components/PaginatedProductGrid";
import NoProductAvailable from "@/components/product/NoProductsAvailable";
import { getSingleUniversityBySlug, getProductsByUniversitySlug, getAllProducts } from "@/sanity/Queries";
import { getUniversityImageUrl } from "@/lib/universityImages";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, GraduationCap, Building2 } from "lucide-react";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

interface UniversityItem {
  _id: string;
  name: string;
  slug: { current: string };
  city?: string;
  domain?: string;
  productCount?: number;
  image?: unknown;
  logo?: unknown;
}

const DEFAULT_UNIVERSITIES_MAP: Record<string, UniversityItem> = {
  "university-of-ghana-legon": {
    _id: "uni-legon",
    name: "University of Ghana (Legon)",
    slug: { current: "university-of-ghana-legon" },
    city: "Accra",
    domain: "st.ug.edu.gh",
  },
  "knust-kumasi": {
    _id: "uni-knust",
    name: "Kwame Nkrumah University of Science and Technology (KNUST)",
    slug: { current: "knust-kumasi" },
    city: "Kumasi",
    domain: "st.knust.edu.gh",
  },
  "university-of-cape-coast": {
    _id: "uni-ucc",
    name: "University of Cape Coast (UCC)",
    slug: { current: "university-of-cape-coast" },
    city: "Cape Coast",
    domain: "stu.ucc.edu.gh",
  },
  "gctu-accra": {
    _id: "uni-gctu",
    name: "Ghana Communication Technology University (GCTU)",
    slug: { current: "gctu-accra" },
    city: "Accra",
    domain: "gctu.edu.gh",
  },
  "umat-tarkwa": {
    _id: "uni-umat",
    name: "University of Mines and Technology (UMaT)",
    slug: { current: "umat-tarkwa" },
    city: "Tarkwa",
    domain: "umat.edu.gh",
  },
};

function findFallbackUniversity(slug: string): UniversityItem | null {
  const s = slug.toLowerCase();
  if (DEFAULT_UNIVERSITIES_MAP[s]) return DEFAULT_UNIVERSITIES_MAP[s];

  if (s.includes("gctu") || s.includes("communication")) {
    return DEFAULT_UNIVERSITIES_MAP["gctu-accra"];
  }
  if (s.includes("umat") || s.includes("mines")) {
    return DEFAULT_UNIVERSITIES_MAP["umat-tarkwa"];
  }
  if (s.includes("ucc") || s.includes("cape-coast") || s.includes("capecoast")) {
    return DEFAULT_UNIVERSITIES_MAP["university-of-cape-coast"];
  }
  if (s.includes("knust") || s.includes("kwame")) {
    return DEFAULT_UNIVERSITIES_MAP["knust-kumasi"];
  }
  if (s.includes("legon") || s.includes("ug") || s.includes("ghana")) {
    return DEFAULT_UNIVERSITIES_MAP["university-of-ghana-legon"];
  }

  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fetched = await getSingleUniversityBySlug(slug);
  const university = fetched || findFallbackUniversity(slug);

  if (!university) {
    return {
      title: "Campus Not Found | UShop",
    };
  }

  return {
    title: `${university.name} Campus Hub | UShop`,
    description: `Shop tech products from verified student sellers at ${university.name}.`,
  };
}

const SingleUniversityPage = async ({ params }: Props) => {
  const { slug } = await params;

  const [fetchedUni, fetchedProducts] = await Promise.all([
    getSingleUniversityBySlug(slug),
    getProductsByUniversitySlug(slug),
  ]);

  const university = fetchedUni || findFallbackUniversity(slug);

  if (!university) {
    return notFound();
  }

  // If no products specific to this campus are returned, fetch general all products as fallbacks
  let displayProducts = fetchedProducts;
  if (!displayProducts || displayProducts.length === 0) {
    const all = await getAllProducts();
    displayProducts = all || [];
  }

  const imageUrl = getUniversityImageUrl(university);

  return (
    <div className="min-h-screen bg-gray-50/50 py-6">
      <Container>
        {/* Breadcrumb */}
        <DynamicBreadcrumb
          customItems={[
            { label: "Universities", href: "/universities" },
            { label: university.name || "Campus" },
          ]}
        />

        {/* Campus Header Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-8 bg-gray-900 text-white min-h-[220px] sm:min-h-[260px] flex items-end">
          {/* Background Photo */}
          <Image
            src={imageUrl}
            alt={university.name || "University Campus"}
            fill
            className="object-cover opacity-40 hover:opacity-50 transition-opacity duration-500"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Banner Content */}
          <div className="relative z-10 p-6 sm:p-8 w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 bg-ushop-pink text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  <GraduationCap className="w-3.5 h-3.5" /> Campus Hub
                </span>
                {university.city && (
                  <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    <MapPin className="w-3 h-3" /> {university.city}
                  </span>
                )}
              </div>

              <Title className="text-2xl sm:text-4xl font-bold text-white drop-shadow-xs mb-2">
                {university.name}
              </Title>

              {university.domain && (
                <div className="text-xs text-gray-300 font-medium">
                  Verified Student Email: <span className="text-white font-bold">@{university.domain}</span>
                </div>
              )}
            </div>

            {/* Campus Items counter */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3 flex items-center gap-3 w-fit">
              <Building2 className="w-6 h-6 text-ushop-pink" />
              <div>
                <div className="text-lg font-bold text-white">{displayProducts.length}</div>
                <div className="text-xs text-gray-300">Campus Products</div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Products at {university.name}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Browse student listings and campus store items
              </p>
            </div>
            <span className="text-xs text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
              {displayProducts.length} items
            </span>
          </div>

          {displayProducts && displayProducts.length > 0 ? (
            <PaginatedProductGrid products={displayProducts} initialLimit={12} incrementBy={12} />
          ) : (
            <div className="py-12">
              <NoProductAvailable className="bg-transparent" />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default SingleUniversityPage;
