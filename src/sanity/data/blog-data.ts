import { groq } from "next-sanity";
import { client } from "../client";
import { Blog } from "../schemas/blog-schema";

export const getAllBlogs = async (): Promise<Blog[]> => {
  return await client.fetch(
    groq`*[_type == "blog"]{
                title,
                "slug": slug.current,
                author,
                publishedOn,
                "coverImage": coverImage.asset->url,
                content,
                tags[]->{name},
                link
                }`
  );
};
