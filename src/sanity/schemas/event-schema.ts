import { title } from "process";
import { Rule, validation } from "sanity";

export interface Event {
  title: string;
  slug: { current: string };
  description: string;
  poster: string;
  images?: { asset: { _ref: string; _type: "reference" } }[];
  type: "workshop" | "seminar" | "hackathon" | "ideathon" | "others";
  status: "comingSoon" | "registrationsOpen" | "registrationsClosed" | "ended";
  certificatesLink?: string;
  galleryLink?: string;
  registrationLink?: string;
  datetime?: string;
  venue?: string;
  minTeamSize?: number;
  maxTeamSize?: number;
  
}

const event = {
  name: "event",
  title: "Event",
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
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "poster",
      title: "Poster",
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
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
        },
      ],
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Workshop", value: "workshop" },
          { title: "Seminar", value: "seminar" },
          { title: "Hackathon", value: "hackathon" },
          { title: "Ideathon", value: "ideathon" },
          { title: "Others", value: "others" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Coming Soon", value: "comingSoon" },
          { title: "Registrations Open", value: "registrationsOpen" },
          { title: "Registrations Closed", value: "registrationsClosed" },
          { title: "Ended", value: "ended" },
        ],
      },
    },
    {
      name: "certificatesLink",
      title: "Certificates Link",
      type: "url",
      hidden: ({ parent }: { parent: any }) => parent.status !== "ended",
      validation: (Rule: any) =>
        Rule.custom((field: any, context: any) => {
          if (context.parent.status === "ended" && !field) {
            return "Certificates Link is required when event is ended";
          }
          return true;
        }),
    },
    {
      name: "galleryLink",
      title: "Gallery Link",
      type: "url",
      hidden: ({ parent }: { parent: any }) => parent.status !== "ended",
      validation: (Rule: any) =>
        Rule.custom((field: any, context: any) => {
          if (context.parent.status === "ended" && !field) {
            return "Gallery Link is required when event is ended";
          }
          return true;
        }),
    },
    {
      name: "registrationLink",
      title: "Registration Link",
      type: "url",
      hidden: ({ parent }: { parent: any }) =>
        parent.status !== "registrationsOpen",
      validation: (Rule: any) =>
        Rule.custom((field: any, context: any) => {
          if (context.parent.status === "registrationsOpened" && !field) {
            return "Registration Link is required when registrations are opened";
          }
          return true;
        }),
    },
    {
      name: "datetime",
      title: "Date & Time",
      type: "datetime",
      hidden: ({ parent }: { parent: any }) =>
        parent.status !== "registrationsOpen" &&
        parent.status !== "registrationsClosed" &&
        parent.status !== "comingSoon",
      validation: (Rule: any) =>
        Rule.custom((field: any, context: any) => {
          if (context.parent.status === "registrationsOpen" && !field) {
            return "Date & Time is required when registration is opened";
          }
          return true;
        }),
    },
    {
      name: "venue",
      title: "Venue",
      type: "string",
      hidden: ({ parent }: { parent: any }) =>
        parent.status !== "registrationsOpen" &&
        parent.status !== "registrationsClosed" &&
        parent.status !== "comingSoon",
      validation: (Rule: any) =>
        Rule.custom((field: any, context: any) => {
          if (context.parent.status === "registrationsOpen" && !field) {
            return "Venue is required when registration is opened";
          }
          return true;
        }),
    },
    {
      name: "minTeamSize",
      title: "Min Team Size",
      type: "number",
      hidden: ({ parent }: { parent: any }) => {
        return (
          parent.type !== "ideathon" &&
          parent.type !== "others") ||
          (parent.type !== "hackathon" &&
          (parent.status !== "registrationsOpen" &&
            parent.status !== "registrationsClosed")
        );
      },
    },
    {
      name: "maxTeamSize",
      title: "Max Team Size",
      type: "number",
      hidden: ({ parent }: { parent: any }) => {
        return (
          (parent.type !== "hackathon" &&
            parent.type !== "ideathon" &&
            parent.type !== "others") ||
          (parent.status !== "registrationsOpen" &&
            parent.status !== "registrationsClosed")
        );
      },
    },
  ],
};

export default event;
