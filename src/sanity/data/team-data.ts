import { groq } from "next-sanity";
import { client } from "../client";
import { Member } from "../schemas/member-schema";

export const getTeamData = async () => {
  return await client.fetch(
    groq`*[_type == "member"] {
            name,
            "slug": slug.current,
            "photo": photo.asset->url,
            "domain": select(
              domain == "business" => "Business",
              domain == "technical" => "Technical",
              domain == "creatives" => "Creatives",
              domain == "events" => "Events",
              domain == "core" => "Core",
              domain == "others" => "Others",
              domain
            ),
            role,
            instagram,
            linkedin,
            github
            }`
  );
};

export const getPresidentData = async () => {
  return await client.fetch(
    groq`*[_type == "member" && role == "president"] {
            name,
            "slug": slug.current,
            "photo": photo.asset->url,
            "domain": select(
              domain == "business" => "Business",
              domain == "technical" => "Technical",
              domain == "creatives" => "Creatives",
              domain == "events" => "Events",
              domain == "core" => "Core",
              domain == "others" => "Others",
              domain
            ),
            "role": select(role == "president" => "President", role),
            instagram,
            linkedin,
            github
            }`
  );
};
export const getVicePresidentData = async () => {
  return await client.fetch(
    groq`*[_type == "member" && role == "vp"] {
            name,
            "slug": slug.current,
            "photo": photo.asset->url,
            "domain": select(
              domain == "business" => "Business",
              domain == "technical" => "Technical",
              domain == "creatives" => "Creatives",
              domain == "events" => "Events",
              domain == "core" => "Core",
              domain == "others" => "Others",
              domain
            ),
            "role": select(role == "vp" => "Vice President", role),
            instagram,
            linkedin,
            github
            }`
  );
};

export const getHeadData = async (): Promise<Member[]> => {
  return await client.fetch(
    groq`*[_type == "member" && role == "head"] | order(name asc) {
            name,
            "slug": slug.current,
            "photo": photo.asset->url,
            "domain": select(
              domain == "business" => "Business",
              domain == "technical" => "Technical",
              domain == "creatives" => "Creatives",
              domain == "events" => "Events",
              domain == "core" => "Core",
              domain == "others" => "Others",
              domain
            ),
            "role": select(
              role == "head" => 
                select(
                  domain == "business" => "Business Head",
                  domain == "technical" => "Technical Head",
                  domain == "creatives" => "Creatives Head",
                  domain == "events" => "Events Head",
                  domain == "core" => "Core Head",
                  domain == "others" => "Others Head",
                  "Head" // Fallback for unspecified domains
                ),
              role // Fallback for unspecified roles
            ),
            instagram,
            linkedin,
            github
            }`
  );
};


export const getLeadData = async (): Promise<Member[]> => {
  return await client.fetch(
    groq`*[_type == "member" && role == "lead"] | order(name asc) {
            name,
            "slug": slug.current,
            "photo": photo.asset->url,
            "domain": select(
              domain == "business" => "Business",
              domain == "technical" => "Technical",
              domain == "creatives" => "Creatives",
              domain == "events" => "Events",
              domain == "core" => "Core",
              domain == "others" => "Others",
              domain
            ),
            "role": select(
              role == "lead" => 
                select(
                  domain == "business" => "Business Lead",
                  domain == "technical" => "Technical Lead",
                  domain == "creatives" => "Creatives Lead",
                  domain == "events" => "Events Lead",
                  domain == "core" => "Core Lead",
                  domain == "others" => "Others Lead",
                  "Lead" // Fallback in case domain doesn't match any specific case
                ),
              role
            ),
            instagram,
            linkedin,
            github
            }`
  );
};

export const getExecutiveData = async (): Promise<Member[]> => {
  return await client.fetch(
    groq`*[_type == "member" && role == "executive"] | order(name asc) {
            name,
            "slug": slug.current,
            "photo": photo.asset->url,
            "domain": select(
              domain == "business" => "Business",
              domain == "technical" => "Technical",
              domain == "creatives" => "Creatives",
              domain == "events" => "Events",
              domain == "core" => "Core",
              domain == "others" => "Others",
              domain
            ),
            "role": select(
              role == "executive" => 
                select(
                  domain == "business" => "Business Executive",
                  domain == "technical" => "Technical Executive",
                  domain == "creatives" => "Creatives Executive",
                  domain == "events" => "Events Executive",
                  domain == "core" => "Core Executive",
                  domain == "others" => "Others Executive",
                  "Executive" // Fallback for unspecified domains
                ),
              role // Fallback for unspecified roles, should not happen in this query
            ),
            instagram,
            linkedin,
            github
            }`
  );
};
