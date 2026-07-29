import { defineType, defineField } from "sanity";
import { TagIcon } from "@sanity/icons";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "productType",
      title: "Product Type",
      type: "string",
      description: "Root product classification (Electronics, Computing, Others)",
      options: {
        list: [
          { title: "Electronics", value: "electronics" },
          { title: "Computing", value: "computing" },
          { title: "Others", value: "others" },
        ],
      },
    }),
    defineField({
      name: "parent",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "category" }],
      description: "Parent category in the hierarchy (leave empty for top-level categories)",
    }),
    defineField({
      name: "level",
      title: "Hierarchy Level",
      type: "string",
      options: {
        list: [
          { title: "Top Category", value: "category" },
          { title: "Subcategory", value: "subcategory" },
          { title: "Leaf Category", value: "leaf" },
        ],
      },
      initialValue: "leaf",
    }),
    defineField({
      name: "keyAttributes",
      title: "Key Attributes",
      type: "array",
      of: [{ type: "string" }],
      description: "Key product specification attributes applicable to this category (e.g., RAM, Screen Size, Power)",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "range",
      title: "Price Starting From",
      type: "number",
      description: "Starting price display for category highlights",
    }),
    defineField({
      name: "featured",
      title: "Featured Category",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Category Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "productType",
      parentTitle: "parent.title",
      level: "level",
      media: "image",
    },
    prepare(selection) {
      const { title, subtitle, parentTitle, level, media } = selection;
      const details = [
        subtitle ? subtitle.toUpperCase() : null,
        level ? `[${level}]` : null,
        parentTitle ? `Sub of: ${parentTitle}` : null,
      ]
        .filter(Boolean)
        .join(" • ");
      return {
        title,
        subtitle: details,
        media,
      };
    },
  },
});