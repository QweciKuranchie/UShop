import Container from "@/components/Container";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import UniversitiesClient, { UniversityCardItem } from "@/components/universities/UniversitiesClient";
import { getUniversities } from "@/sanity/Queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campus Hubs & Student Sellers | UShop",
  description: "Explore student seller hubs and campus storefronts across Ghana universities.",
};

const DEFAULT_UNIVERSITIES: UniversityCardItem[] = [
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

const UniversitiesPage = async () => {
  const fetchedUniversities = await getUniversities();

  // Merge default list with fetched Sanity items so all core Ghana universities (Legon, KNUST, UCC, GCTU, UMaT) are always rendered
  const mergedList = DEFAULT_UNIVERSITIES.map((def) => {
    const key = (def.slug?.current || "").toLowerCase();
    const found = (fetchedUniversities || []).find((f: { _id?: string; name?: string; slug?: { current?: string } }) => {
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
    (f: { _id?: string; name?: string; slug?: { current?: string } }) =>
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
        {/* Breadcrumb Navigation */}
        <DynamicBreadcrumb
          customItems={[
            { label: "Universities", href: "/universities" }
          ]}
        />

        {/* Universities Hero Banner & Interactive Search Grid */}
        <UniversitiesClient universitiesList={universitiesList} />
      </Container>
    </div>
  );
};

export default UniversitiesPage;
