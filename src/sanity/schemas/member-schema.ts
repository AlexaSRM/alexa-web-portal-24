import { Rule } from "sanity";

export interface Member {
  name: string;
  slug: { current: string };
  photo: string;
  domain: "business" | "technical" | "creatives" | "events" | "core" | "others";
  role: 
    | "president"
    | "vp"
    | "head"
    | "lead"
    | "executive"
    | "member"
    | "alumni"
    | "conveners"
    | "others";
  instagram: string;
  linkedin: string;
  github?: string;
}

const member = {
  name: "member",
  title: "Member",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "domain",
      title: "Domain",
      type: "string",
      options: {
        list: [
          { title: "Business", value: "business" },
          { title: "Technical", value: "technical" },
          { title: "Creatives", value: "creatives" },
          { title: "Events", value: "events" },
          { title: "Core", value: "core" },
          { title: "Others", value: "others" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "President", value: "president" },
          { title: "Vice President", value: "vp" },
          { title: "Head", value: "head" },
          { title: "Lead", value: "lead" },
          { title: "Executive", value: "executive" },
          { title: "Member", value: "member" },
          { title: "Alumni", value: "alumni" },
          { title: "Conveners", value: "conveners" },
          { title: "Others", value: "others" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "instagram",
      title: "Instagram",
      type: "url",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "linkedin",
      title: "LinkedIn",
      type: "url",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "github",
      title: "GitHub",
      type: "url",
    },
  ],
};

export default member;
