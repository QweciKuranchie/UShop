import { defineType, defineField } from "sanity";
import { HomeIcon, CaseIcon, BookIcon } from "@sanity/icons";

export const addressType = defineType({
  name: "address",
  title: "Address",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "addressType",
      title: "Address Type",
      type: "string",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "Work", value: "work" },
          { title: "School", value: "school" },
        ],
        layout: "radio",
      },
      initialValue: "home",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "streetAddress",
      title: "Street Address",
      type: "string",
      description: "The street address including apartment/unit/House number",
      validation: (Rule) => Rule.required().min(5).max(100),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "state",
      title: "State / Region",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      initialValue: "Ghana",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: "name",
      street: "streetAddress",
      city: "city",
      type: "addressType",
    },
    prepare(selection) {
      const { name, street, city, type } = selection;
      let mediaIcon = HomeIcon;
      if (type === "work") mediaIcon = CaseIcon;
      if (type === "school") mediaIcon = BookIcon;

      return {
        title: name,
        subtitle: `${street}, ${city} (${type ? type.toUpperCase() : "HOME"})`,
        media: mediaIcon,
      };
    },
  },
});
