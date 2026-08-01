import { defineQuery } from "next-sanity";

const BANNER_QUERY = defineQuery(
  `*[_type == 'banner'] | order(publishedAt desc)`
);
const FEATURED_CATEGORY_QUERY = defineQuery(
  `*[_type == 'category' && featured == true] | order(name desc)`
);
const ALL_PRODUCTS_QUERY = defineQuery(
  `*[_type=="product"] | order(name asc){
    ...,
    "categories": categories[]->title
  }`
);
const DEAL_PRODUCTS = defineQuery(
  `*[_type == 'product' && status == 'hot'] | order(name asc){
  ...,"categories": categories[]->title
}`
);
const FEATURE_PRODUCTS = defineQuery(
  `*[_type == 'product' && isFeatured == true] | order(name asc){
  ...,"categories": categories[]->title
}`
);
const BRANDS_QUERY = defineQuery(`*[_type=='brand'] | order(name asc) `);

// Address Query
const ADDRESS_QUERY = defineQuery(
  `*[_type=="address"] | order(publishedAt desc)`
);

const ALLCATEGORIES_QUERY = defineQuery(
  `*[_type == 'category'] | order(name asc) [0...$quantity]`
);

const ADMIN_CATEGORIES_QUERY = defineQuery(
  `*[_type == 'category'] | order(title asc) {
    _id,
    title,
    slug,
    description,
    featured
  }`
);

const PRODUCT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug] | order(name asc) [0]{
    ...,
    "averageRating": math::avg(*[_type == "review" && product._ref == ^._id && status == "approved"].rating),
    "totalReviews": count(*[_type == "review" && product._ref == ^._id && status == "approved"])
  }`
);

const RELATED_PRODUCTS_QUERY = defineQuery(
  `*[_type == "product" && count((categories[]._ref)[@ in $categoryIds]) > 0 && slug.current != $currentSlug] | order(name asc) [0...$limit]{
    _id,
    name,
    slug,
    price,
    discount,
    stock,
    images,
    categories[]->{
      _id,
      title,
      slug
    }
  }`
);

const BRAND_QUERY = defineQuery(`*[_type == "product" && slug.current == $slug]{
"brandName": brand->title
}`);

const UNIVERSITIES_QUERY = defineQuery(
  `*[_type == 'location' && type == 'university'] | order(name asc)`
);

const PRODUCT_CLASSIFICATIONS_QUERY = defineQuery(
  `*[_type == "productClassification"] | order(title asc) {
    _id,
    title,
    slug
  }`
);

const CATEGORIES_HIERARCHY_QUERY = defineQuery(
  `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    level,
    description,
    range,
    featured,
    image,
    productType->{
      _id,
      title,
      slug
    },
    parent->{
      _id,
      title,
      slug,
      parent->{
        _id,
        title,
        slug
      }
    },
    attributes[]{
      required,
      attribute->{
        _id,
        title,
        slug,
        type,
        options,
        unit
      }
    }
  }`
);

const PRODUCTS_BY_CLASSIFICATION_QUERY = defineQuery(
  `*[_type == "product" && productClassification->slug.current == $classificationSlug] | order(name asc) {
    ...,
    productClassification->{
      _id,
      title,
      slug
    },
    category->{
      _id,
      title,
      slug,
      parent->{
        _id,
        title,
        slug
      }
    },
    brand->{
      _id,
      name,
      slug
    },
    "attributeMap": attributeValues[]{
      "key": attribute->title,
      "slug": attribute->slug.current,
      "type": attribute->type,
      "unit": attribute->unit,
      "value": coalesce(
        valueString,
        valueNumber,
        valueBoolean,
        valueSelect,
        valueMultiSelect
      )
    }
  }`
);

export {
  BANNER_QUERY,
  FEATURED_CATEGORY_QUERY,
  ALL_PRODUCTS_QUERY,
  DEAL_PRODUCTS,
  FEATURE_PRODUCTS,
  BRANDS_QUERY,
  ADDRESS_QUERY,
  ALLCATEGORIES_QUERY,
  ADMIN_CATEGORIES_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  RELATED_PRODUCTS_QUERY,
  BRAND_QUERY,
  UNIVERSITIES_QUERY,
  PRODUCT_CLASSIFICATIONS_QUERY,
  CATEGORIES_HIERARCHY_QUERY,
  PRODUCTS_BY_CLASSIFICATION_QUERY,
};
