import { groq } from "next-sanity";
import { client } from "../client";

export const getAllEvents = async () => {
  return await client.fetch(
    groq`*[_type == "event"]{
                title,
                "slug": slug.current,
                "poster": poster.asset->url
                }`
  );
};
