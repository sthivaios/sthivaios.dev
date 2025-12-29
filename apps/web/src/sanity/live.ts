import { defineLive } from "next-sanity/live";
import { client } from "@/sanity/client";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  browserToken: process.env.SANITY_BROWSER_TOKEN,
  serverToken: process.env.SANITY_SERVER_TOKEN,
});
