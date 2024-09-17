import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemaTypes from "@/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03'

const config = defineConfig({
  name: "default",
  title: "alexa-web-portal-24",
  projectId,
  dataset,
  apiVersion,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});

export default config;
