import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });
dotenv.config();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error("❌ Error: Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in environment.");
  process.exit(1);
}

if (!token) {
  console.error("❌ Error: Missing SANITY_API_WRITE_TOKEN in .env.local.");
  console.error("Please create a token with 'Write' permissions in the Sanity Manage Dashboard (https://sanity.io/manage) and add it to your .env.local file.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-07-07",
  token,
  useCdn: false,
});

async function uploadImageAsset(imagePath: string): Promise<any> {
  try {
    const absolutePath = path.resolve(imagePath);
    if (!fs.existsSync(absolutePath)) {
      console.warn(`⚠️ Warning: Image file not found at ${absolutePath}.`);
      return null;
    }
    const fileStream = fs.createReadStream(absolutePath);
    const asset = await client.assets.upload("image", fileStream, {
      filename: path.basename(absolutePath),
    });
    console.log(`🖼️ Uploaded: ${path.basename(absolutePath)} (Asset ID: ${asset._id})`);
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`❌ Failed to upload image from ${imagePath}:`, error);
    return null;
  }
}

async function runSeed() {
  console.log("🚀 Starting Sanity Database Seeding...");

  // 1. Seed Locations
  console.log("\n📍 Seeding Locations...");
  const locations = [
    {
      _id: "location-legon",
      _type: "location",
      name: "University of Ghana (Legon)",
      slug: { _type: "slug", current: "ug-legon" },
      type: "university",
      city: "Accra",
      emailDomain: "student.ug.edu.gh",
    },
    {
      _id: "location-knust",
      _type: "location",
      name: "KNUST Campus",
      slug: { _type: "slug", current: "knust" },
      type: "university",
      city: "Kumasi",
      emailDomain: "student.knust.edu.gh",
    },
    {
      _id: "location-east-legon",
      _type: "location",
      name: "East Legon",
      slug: { _type: "slug", current: "east-legon" },
      type: "residential",
      city: "Accra",
    },
  ];

  for (const loc of locations) {
    await client.createOrReplace(loc);
    console.log(`✅ Created Location: ${loc.name}`);
  }

  // 2. Seed Brands
  console.log("\n🏷️ Seeding Brands...");
  const brands = [
    { _id: "brand-apple", _type: "brand", name: "Apple", slug: { _type: "slug", current: "apple" }, description: "Premium laptops, phones, and tablets." },
    { _id: "brand-samsung", _type: "brand", name: "Samsung", slug: { _type: "slug", current: "samsung" }, description: "Innovative mobile technology and appliances." },
    { _id: "brand-dell", _type: "brand", name: "Dell", slug: { _type: "slug", current: "dell" }, description: "High-performance enterprise and gaming laptops." },
    { _id: "brand-hp", _type: "brand", name: "HP", slug: { _type: "slug", current: "hp" }, description: "Versatile computers and business gadgets." },
    { _id: "brand-sony", _type: "brand", name: "Sony", slug: { _type: "slug", current: "sony" }, description: "Leading audio, imaging, and gaming consoles." },
  ];

  for (const brand of brands) {
    await client.createOrReplace(brand);
    console.log(`✅ Created Brand: ${brand.name}`);
  }

  // 3. Seed Categories (with image uploads)
  console.log("\n📁 Seeding Categories with Local Images...");
  const categoriesToSeed = [
    {
      _id: "category-phones-tablets",
      _type: "category",
      title: "Phones & Tablets",
      slug: { _type: "slug", current: "phones-tablets" },
      imagePath: "public/assets/images/categories/phone.png",
    },
    {
      _id: "category-laptops-computers",
      _type: "category",
      title: "Laptops & Computers",
      slug: { _type: "slug", current: "laptops-computers" },
      imagePath: "public/assets/images/categories/laptop.jpg",
    },
    {
      _id: "category-accessories",
      _type: "category",
      title: "Accessories",
      slug: { _type: "slug", current: "accessories" },
      imagePath: "public/assets/images/categories/Accessories.png",
    },
    {
      _id: "category-appliances",
      _type: "category",
      title: "Appliances",
      slug: { _type: "slug", current: "appliances" },
      imagePath: "public/assets/images/categories/storage.png",
    },
    {
      _id: "category-gaming",
      _type: "category",
      title: "Gaming",
      slug: { _type: "slug", current: "gaming" },
      imagePath: "public/assets/images/categories/Gaming.png",
    },
  ];

  for (const cat of categoriesToSeed) {
    let imageAsset = null;
    if (cat.imagePath) {
      imageAsset = await uploadImageAsset(cat.imagePath);
    }

    const doc: any = {
      _id: cat._id,
      _type: "category",
      title: cat.title,
      slug: cat.slug,
    };

    if (imageAsset) {
      doc.image = imageAsset;
    }

    await client.createOrReplace(doc);
    console.log(`✅ Created Category: ${cat.title}`);
  }

  // 4. Seed Stores (linked to locations)
  console.log("\n🏪 Seeding Stores...");
  const stores = [
    {
      _id: "store-campus-techs",
      _type: "store",
      name: "Legon Campus Techs",
      slug: { _type: "slug", current: "legon-campus-techs" },
      ownerName: "Nuhu Kuranchie",
      clerkUserId: "user_mock_clerk_12345",
      location: { _type: "reference", _ref: "location-legon" },
      description: "Direct on-campus sales of verified grade-A student tech gear.",
      verifiedStudent: true,
      verifiedSeller: true,
      rating: 4.9,
      status: "active",
    },
    {
      _id: "store-accra-gadgets",
      _type: "store",
      name: "Accra Premium Gadgets",
      slug: { _type: "slug", current: "accra-premium-gadgets" },
      ownerName: "Kofi Owusu",
      clerkUserId: "user_mock_clerk_67890",
      location: { _type: "reference", _ref: "location-east-legon" },
      description: "Slightly used laptops and audio equipment with delivery in East Legon.",
      verifiedStudent: false,
      verifiedSeller: true,
      rating: 4.7,
      status: "active",
    },
  ];

  for (const store of stores) {
    await client.createOrReplace(store);
    console.log(`✅ Created Store: ${store.name}`);
  }

  // 5. Seed Products (linked to categories, brands, and stores)
  console.log("\n📦 Seeding Products...");
  const products = [
    {
      _id: "product-macbook-pro-14",
      _type: "product",
      name: 'MacBook Pro 14" M3',
      slug: { _type: "slug", current: "macbook-pro-14-m3" },
      price: 18500,
      compareAtPrice: 21000,
      description: "M3 chip, 8GB Unified Memory, 512GB SSD. Used for 3 months, pristine condition.",
      categories: [{ _type: "reference", _ref: "category-laptops-computers" }],
      brand: { _type: "reference", _ref: "brand-apple" },
      store: { _type: "reference", _ref: "store-campus-techs" },
      stock: 1,
      status: "new",
      imagePath: "public/assets/images/categories/laptop.jpg",
    },
    {
      _id: "product-iphone-15-pro",
      _type: "product",
      name: "iPhone 15 Pro 128GB",
      slug: { _type: "slug", current: "iphone-15-pro-128gb" },
      price: 13500,
      compareAtPrice: 15000,
      description: "Natural Titanium, 100% battery health, screen protector and box included.",
      categories: [{ _type: "reference", _ref: "category-phones-tablets" }],
      brand: { _type: "reference", _ref: "brand-apple" },
      store: { _type: "reference", _ref: "store-campus-techs" },
      stock: 2,
      status: "hot",
      imagePath: "public/assets/images/categories/phone.png",
    },
    {
      _id: "product-galaxy-s24",
      _type: "product",
      name: "Galaxy S24 Ultra 256GB",
      slug: { _type: "slug", current: "galaxy-s24-ultra-256gb" },
      price: 14500,
      compareAtPrice: 16500,
      description: "Titanium Gray. Factory unlocked, S-Pen included, brand new condition.",
      categories: [{ _type: "reference", _ref: "category-phones-tablets" }],
      brand: { _type: "reference", _ref: "brand-samsung" },
      store: { _type: "reference", _ref: "store-accra-gadgets" },
      stock: 1,
      status: "sale",
      imagePath: "public/assets/images/categories/phone.png",
    },
    {
      _id: "product-sony-headphones",
      _type: "product",
      name: "Sony WH-1000XM5 Noise Cancelling Headphones",
      slug: { _type: "slug", current: "sony-wh-1000xm5" },
      price: 4500,
      compareAtPrice: 5000,
      description: "Industry-leading active noise cancellation, silver, battery lasts 30 hours.",
      categories: [{ _type: "reference", _ref: "category-accessories" }],
      brand: { _type: "reference", _ref: "brand-sony" },
      store: { _type: "reference", _ref: "store-accra-gadgets" },
      stock: 3,
      status: "new",
      imagePath: "public/assets/images/categories/Accessories.png",
    },
    {
      _id: "product-playstation-5",
      _type: "product",
      name: "PlayStation 5 Slim (Disc Edition)",
      slug: { _type: "slug", current: "playstation-5-slim" },
      price: 7800,
      compareAtPrice: 8500,
      description: "Slim model, 1TB SSD, comes with 1 dualsense controller and EA Sports FC 24.",
      categories: [{ _type: "reference", _ref: "category-gaming" }],
      brand: { _type: "reference", _ref: "brand-sony" },
      store: { _type: "reference", _ref: "store-campus-techs" },
      stock: 1,
      status: "hot",
      imagePath: "public/assets/images/categories/Gaming.png",
    },
  ];

  for (const prod of products) {
    let imageAsset = null;
    if (prod.imagePath) {
      imageAsset = await uploadImageAsset(prod.imagePath);
    }

    const doc: any = {
      _id: prod._id,
      _type: "product",
      name: prod.name,
      slug: prod.slug,
      price: prod.price,
      compareAtPrice: prod.compareAtPrice,
      description: prod.description,
      categories: prod.categories,
      brand: prod.brand,
      store: prod.store,
      stock: prod.stock,
      status: prod.status,
    };

    if (imageAsset) {
      doc.images = [imageAsset];
    }

    await client.createOrReplace(doc);
    console.log(`✅ Created Product: ${prod.name}`);
  }

  console.log("\n🎉 Seeding Completed Successfully!");
}

runSeed().catch((err) => {
  console.error("❌ Seeding failed:", err);
});
