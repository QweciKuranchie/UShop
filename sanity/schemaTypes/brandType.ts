import { defineType, defineField } from "sanity";
import { MasterDetailIcon } from "@sanity/icons";

export const brandType = defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  icon: MasterDetailIcon,
  fields: [
    defineField({
      name: "name",
      title: "Brand Name",
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
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
  preview: {
        select:{
            title: "title",
            subtitle: "description",
            media: "image",
        }
    },
});
