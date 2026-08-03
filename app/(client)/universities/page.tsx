import Container from "@/components/Container";
import Title from "@/components/Title";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { getUniversities } from "@/sanity/Queries";
import { getUniversityImageUrl } from "@/lib/universityImages";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, MapPin, Building2, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campus Marketplaces & Universities | UShop",
  description: "Shop products from verified student sellers and vendors across Ghana university campuses.",
};

const DEFAULT_UNIVERSITIES = [
  {
    _id: "uni-legon",
    name: "University of Ghana (Legon)",
    slug: { current: "university-of-ghana-legon" },
    city: "Accra",
    domain: "st.ug.edu.gh",
    productCount: 42,
  },
  {
    _id: "uni-knust",
    name: "Kwame Nkrumah University of Science and Technology (KNUST)",
    slug: { current: "knust-kumasi" },
    city: "Kumasi",
    domain: "st.knust.edu.gh",
    productCount: 38,
  },
  {
    _id: "uni-ucc",
    name: "University of Cape Coast (UCC)",
    slug: { current: "university-of-cape-coast" },
    city: "Cape Coast",
    domain: "stu.ucc.edu.gh",
    productCount: 29,
  },
  {
    _id: "uni-gctu",
    name: "Ghana Communication Technology University (GCTU)",
    slug: { current: "gctu-accra" },
    city: "Accra",
    domain: "gctu.edu.gh",
    productCount: 19,
  },
  {
    _id: "uni-umat",
    name: "University of Mines and Technology (UMaT)",
    slug: { current: "umat-tarkwa" },
    city: "Tarkwa",
    domain: "umat.edu.gh",
    productCount: 15,
  },
];

interface UniversityCardItem {
  _id: string;
  name?: string;
  slug?: { current?: string };
  city?: string;
  domain?: string;
  productCount?: number;
  image?: unknown;
  logo?: unknown;
}

const UniversitiesPage = async () => {
  const fetchedUniversities = await getUniversities();

  // Merge default list with fetched Sanity items so all core Ghana universities (Legon, KNUST, UCC, GCTU, UMaT) are always rendered
  const mergedList = DEFAULT_UNIVERSITIES.map((def) => {
    const key = def.slug.current.toLowerCase();
    const found = (fetchedUniversities || []).find((f: any) => {
      const fSlug = (f.slug?.current || "").toLowerCase();
      const fName = (f.name || "").toLowerCase();
      return (
        fSlug === key ||
        fName.includes(key) ||
        (key.includes("legon") && (fSlug.includes("legon") || fSlug.includes("ug"))) ||
        (key.includes("knust") && (fSlug.includes("knust") || fSlug.includes("kwame"))) ||
        (key.includes("ucc") && (fSlug.includes("ucc") || fSlug.includes("cape"))) ||
        (key.includes("gctu") && (fSlug.includes("gctu") || fSlug.includes("communication"))) ||
        (key.includes("umat") && (fSlug.includes("umat") || fSlug.includes("mines")))
      );
    });
    return found ? { ...def, ...found } : def;
  });

  const extraSanity = (fetchedUniversities || []).filter(
    (f: any) =>
      !mergedList.some(
        (m) =>
          m._id === f._id ||
          (m.slug?.current && f.slug?.current && m.slug.current === f.slug.current)
      )
  );

  const universitiesList = [...mergedList, ...extraSanity];

  return (
    <div className="min-h-screen bg-gray-50/50 py-6">
      <Container>
        {/* Breadcrumb */}
        <DynamicBreadcrumb
          customItems={[
            { label: "Universities", href: "/universities" }
          ]}
        />

        {/* Hero Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xs border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-ushop-pink/10 text-ushop-pink text-xs font-semibold rounded-full mb-3">
              <GraduationCap className="w-4 h-4" /> Verified Student Marketplaces
            </span>
            <Title className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
              Campus Marketplaces
            </Title>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl">
              Buy and sell directly on your campus. Connect with verified student entrepreneurs and campus vendors across Ghana.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-ushop-light/50 px-6 py-4 rounded-2xl border border-gray-200/60">
            <Building2 className="w-10 h-10 text-ushop-pink" />
            <div className="text-left">
              <div className="text-2xl font-bold text-gray-900">{universitiesList.length}</div>
              <div className="text-xs font-medium text-gray-500">Active Campuses</div>
            </div>
          </div>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {universitiesList.map((uni: UniversityCardItem) => {
            const imageUrl = getUniversityImageUrl(uni);
            const slug = uni.slug?.current || "";

            return (
              <Link
                key={uni._id}
                href={`/universities/${slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-md hover:border-ushop-pink/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Campus Image Header */}
                  <div className="relative aspect-video w-full bg-ushop-light/40 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={uni.name || "University Campus"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    
                    {/* City Tag on Image */}
                    {uni.city && (
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                        <MapPin className="w-3 h-3 text-ushop-pink" />
                        {uni.city}
                      </div>
                    )}

                    {/* Campus Title Overlay */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="text-lg font-bold text-white drop-shadow-xs line-clamp-1">
                        {uni.name}
                      </h3>
                    </div>
                  </div>

                  {/* Campus Body Info */}
                  <div className="p-5">
                    {uni.domain && (
                      <div className="inline-flex items-center gap-1.5 text-xs text-ushop-purple bg-ushop-purple/10 px-2.5 py-1 rounded-md font-medium mb-3">
                        <span>@{uni.domain}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                      <span>Available Items</span>
                      <span className="font-semibold text-gray-900 bg-gray-100 px-2 py-0.5 rounded-full">
                        {uni.productCount ?? 0} listed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-5 py-3.5 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-ushop-pink group-hover:bg-ushop-pink group-hover:text-white transition-colors duration-200">
                  <span>Explore Campus Shop</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default UniversitiesPage;
