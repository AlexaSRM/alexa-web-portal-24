import { Rule } from "sanity";

export interface AlexaVerse {
    title: string;
    slug: string;
    ticket: string;
    registrationClosed: boolean;
    registrationUrl: string;
    minParticipants: number;
    maxParticipants: number;
};

const alexaverse = {
  name: "alexaverse",
  title: "AlexaVerse",
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
        source: "name",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
        name: "ticket",
        title: "Ticket",
        type: "image",
        options: { hotspot: true },
        field: [
            {
                name: "alt",
                title: "Alt",
                type: "string",
            },
        ],
        validation: (Rule: any) => Rule.required(),
        
    },
    {
        name: "registrationClosed",
        title: "Registration Closed",
        type: "boolean",
        validation: (Rule: any) => Rule.required(),
    },
    {
      name: "registrationUrl",
      title: "Registration URL",
      type: "url",
      validation: (Rule: any) => Rule
        .uri({ allowRelative: true })
    },
    {
        name: "minParticipants",
        title: "Minimum Participants",
        type: "number",
        validation: (Rule: any) => Rule.required(),
    },
    {
        name: "maxParticipants",
        title: "Maximum Participants",
        type: "number",
        validation: (Rule: any) => Rule.required(),
    }
  ],
};

export default alexaverse;