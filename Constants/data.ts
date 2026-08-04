import { GraduationCap, Grid3X3, Home, ShoppingBag, Store } from "lucide-react";


export const headerData = [
  { title: "Home", href: "/", icon: Home },
  { title: "Products", href: "/shop", icon: ShoppingBag },
  { title: "Categories", href: "/category", icon: Grid3X3 },
  { title: "Universities", href: "/universities", icon: GraduationCap },
  { title: "Stores", href: "/stores", icon: Store},
];
export const customerCareData = {
  title:"Customer Care",
  links: [
    { title: "About Us", href: "/about" },
    { title: "Contact Us", href: "/contact" },
    { title: "Terms & Conditions", href: "/terms" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "FAQs", href: "/faqs" },
    { title: "Help", href: "/help" },
  ],
}
export const supportData = {
  title: "Need Help?",
  links: [
  { title: "Help Center", href: "/help" },
  { title: "Customer Service", href: "/support" },
  { title: "Track Your Order", href: "/track-order" },
  { title: "Return Policy", href: "/returns" },
  { title: "Shipping Info", href: "/shipping" },
  { title: "Sitemap", href: "/sitemap" },
]
  
};
export const quickLinksData = {
  title: "Quick Links",
  links: [
    { title: "All Products", href: "/shop" },
    { title: "Deals", href: "/deals" },
    { title: "Universities", href: "/universities" },
    { title: "Stores", href: "/stores" },
    {title:"Flash Sales", href:"/deal"},
    {title:"New Arrivals", href:"/new-arrivals"},
  ],
}
export const categoriesData = {
  title: "Categories",
  links: [
    { title: "All Categories", href: "/category" },
    { title: "Phones", href: "/phones" },
    { title: "Laptops", href: "/laptops" },
    { title: "Accessories", href: "/accessories" },
    { title: "Appliances", href: "/appliances" },
    { title: "Gaming", href: "/gaming" },
  ]
}
export const userAccountData = [
  { title: "My Profile", href: "/account/profile" },
  { title: "My Orders", href: "/user/orders" },
  { title: "My Wishlist", href: "/wishlist" },
  { title: "Shopping Cart", href: "/cart" },
  { title: "Address Book", href: "/account/addresses" },
  { title: "Payment Methods", href: "/account/payments" },
  { title: "Order History", href: "/user/orders" },
];
export const productType = [
  { title: "All", value: "all" },
  { title: "Electronics", value: "electronics" },
  { title: "Computing", value: "computing" },
  { title: "Gaming", value: "gaming" },
  { title: "Others", value: "others" },
];
export const faqsData = [
  {
    question: "What services does U-Shop offer?",
    answer:
      "U-Shop offers a wide range of technology solutions including custom software development, cloud services, and digital transformation consulting.",
  },
  {
    question: "How can I get support for U-Shop products?",
    answer:
      "You can reach our support team through our contact page or by emailing support@ushopgh.com.",
  },
  {
    question: "Does U-Shop offer training for its products?",
    answer:
      "Yes, we offer comprehensive training programs for all our products and services. Please contact our sales team for more information.",
  },
  {
    question: "What industries does U-Shop serve?",
    answer:
      "U-Shop serves a wide range of industries including finance, healthcare, retail, and manufacturing.",
  },
  {
    question: "How does U-Shop ensure data security?",
    answer:
      "We employ industry-standard security measures and comply with all relevant data protection regulations to ensure the security of our clients' data.",
  },
];
