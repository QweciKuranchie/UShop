import { defineType, defineField } from "sanity";
import { TrolleyIcon } from "@sanity/icons";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [{ type: "image", options: {
        hotspot: true,
      } }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (GHS)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "discount",
      title: "Discount",
      type: "number",
    }),
    defineField({
      name: "compareAtPrice",
      title: "Compare at Price (GHS)",
      type: "number",
      description: "Original price before discount/deal",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{type: "reference",
      to: [{ type: "category" }]}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }],
    }),
    defineField({
      name: "store",
      title: "Store / Seller",
      type: "reference",
      to: [{ type: "store" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stock",
      title: "Stock / Inventory",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "status",
      title: "Product Status",
      type: "string",
      options: {
        list: [
            {title: "New", value: "new"},
            {title: "Hot", value: "hot"},
            {title: "Sale", value: "sale"},
        ],

      },
    }),
    defineField({
      name: "variant",
      title: "Product Type",
      type: "string",
      options: {
        list: [
            {title: "Electronics", value: "electronics"},
            {title: "Computing", value: "computing"},
            {title: "others", value: "others"},
        ],

      },
    }),
    defineField({
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      description: "Toggle to Featured on or off",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      media: "image",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      const image = media && media[0];
      return {
        title: title,
        subtitle: subtitle ? `₵${subtitle}` : "",
        media: image,
      };
    },
  },
});
