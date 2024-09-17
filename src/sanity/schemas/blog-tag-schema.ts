import { Rule } from 'sanity';
const blogTag = {
  name: "blogTag",
  title: "Blog Tag",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
  ],
};

export default blogTag;