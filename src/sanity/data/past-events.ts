import { groq } from "next-sanity";
import { client } from "../client";

const getPastEvents = async () => {
  return await client.fetch(
    groq`*[_type == "event" && datetime < now()] | order(datetime desc) {
            title,
            slug,
            datetime,
            venue,
            description,
            poster,
            images
            }`
  );
};

export default getPastEvents;
