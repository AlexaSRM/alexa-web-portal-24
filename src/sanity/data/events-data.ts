import { groq } from "next-sanity";
import { client } from "../client";
import { Event } from "../schemas/event-schema";

export const getAllEvents = async (): Promise<Event[]> => {
  return await client.fetch(
    groq`*[_type == "event"]{
                title,
                "slug": slug.current,
                "poster": poster.asset->url,
                description
                }`
  );
}

export const getEventBySlug = async (slug: string): Promise<Event> => {
  return await client.fetch(
    groq`*[_type == "event" && slug.current == $slug][0]{
                title,
                "slug": slug.current,
                "poster": poster.asset->url,
                description,
                status,
                type,
                datetime,
                venue,
                minTeamSize,
                maxTeamSize,
                certificatesLink,
                galleryLink,
                registrationLink
                }`,
    { slug }
  );
}