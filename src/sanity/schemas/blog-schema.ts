import { Rule } from "sanity";

export interface Blog {
  title: string;
  slug: { current: string };
  author: { _ref: string; _type: "reference" };
  publishedOn: string;
  coverImage: string;
  content: Array<{ _type: "block"; children: any[]; [key: string]: any }>;
  tags?: Array<{ _ref: string; _type: "reference" }>;
  link: string;
}

const blog = {
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "publishedOn",
      title: "Published On",
      type: "date",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blogTag" }] }],
    },
    {
      name: "link",
      title: "Link",
      type: "url",
      validation: (Rule: any) => Rule.required(),
    }
  ],
};

export default blog;
