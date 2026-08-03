export interface DefaultStore {
  _id: string;
  name: string;
  slug: { current: string };
  ownerName: string;
  description: string;
  rating: number;
  verifiedStudent: boolean;
  verifiedSeller: boolean;
  productCount: number;
  location?: {
    name: string;
    city: string;
    slug?: { current: string };
  };
}

export const DEFAULT_STORES: DefaultStore[] = [
  {
    _id: "store-legon-tech-hub",
    name: "Legon Campus Tech Hub",
    slug: { current: "legon-campus-tech-hub" },
    ownerName: "Kofi Mensah",
    description: "Your premier campus store for verified laptops, smartphones, and student tech accessories at UG Legon.",
    rating: 4.9,
    verifiedStudent: true,
    verifiedSeller: true,
    productCount: 14,
    location: {
      name: "University of Ghana (Legon)",
      city: "Accra",
      slug: { current: "university-of-ghana-legon" },
    },
  },
  {
    _id: "store-knust-gadgets",
    name: "KNUST Electronics Mart",
    slug: { current: "knust-electronics-mart" },
    ownerName: "Ama Osei",
    description: "Quality electronics, audio gear, gaming equipment, and dorm essentials for KNUST students.",
    rating: 4.8,
    verifiedStudent: true,
    verifiedSeller: true,
    productCount: 18,
    location: {
      name: "KNUST",
      city: "Kumasi",
      slug: { current: "knust-kumasi" },
    },
  },
  {
    _id: "store-ucc-corner",
    name: "UCC Student Tech Corner",
    slug: { current: "ucc-student-tech-corner" },
    ownerName: "Kwame Addo",
    description: "Affordable tech, mobile phones, chargers, and computing gear at Cape Coast University.",
    rating: 4.7,
    verifiedStudent: true,
    verifiedSeller: true,
    productCount: 9,
    location: {
      name: "University of Cape Coast (UCC)",
      city: "Cape Coast",
      slug: { current: "university-of-cape-coast" },
    },
  },
  {
    _id: "store-gctu-zone",
    name: "GCTU Gadget Zone",
    slug: { current: "gctu-gadget-zone" },
    ownerName: "Esi Baidoo",
    description: "High-performance tech gear, networking devices, and PC accessories for GCTU engineering & tech students.",
    rating: 4.9,
    verifiedStudent: true,
    verifiedSeller: true,
    productCount: 12,
    location: {
      name: "Ghana Communication Tech (GCTU)",
      city: "Accra",
      slug: { current: "gctu-accra" },
    },
  },
  {
    _id: "store-umat-supplies",
    name: "UMaT Campus Supplies",
    slug: { current: "umat-campus-supplies" },
    ownerName: "Yaw Boateng",
    description: "Student tech gadgets, mining tools, laptops, and campus lifestyle items at UMaT Tarkwa.",
    rating: 4.8,
    verifiedStudent: true,
    verifiedSeller: true,
    productCount: 8,
    location: {
      name: "University of Mines (UMaT)",
      city: "Tarkwa",
      slug: { current: "umat-tarkwa" },
    },
  },
];
