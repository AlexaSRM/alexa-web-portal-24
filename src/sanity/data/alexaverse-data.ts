import { groq } from "next-sanity";
import { client } from "../client";
import { AlexaVerse } from "../schemas/alexaverse-schema";

export const getAllTickets = async (): Promise<AlexaVerse[]> => {
  return await client.fetch(
    groq`*[_type == "alexaverse"]{
                title,
                "slug": slug.current,
                "ticket": ticket.asset->url,
                registrationUrl,
                }`
  );
};

export const getTicketBySlug = async (slug: string): Promise<AlexaVerse> => {
  return await client.fetch(
    groq`*[_type == "alexaverse" && slug.current == $slug][0]{
                title,
                "slug": slug.current,
                "ticket": ticket.asset->url,
                registrationClosed,
                minParticipants,
                maxParticipants
                }`,
    { slug }
  );
};