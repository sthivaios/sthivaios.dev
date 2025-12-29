import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";

export async function fetchPosts(searchTerm: string) {
  const POSTS_QUERY = defineQuery(`*[
  _type == "post"
  && defined(slug.current)
  && slug.current != "about-me"
  && [title, body[].children[].text, tag] match $searchTerm
]|order(date asc){_id, title, slug, mainImage, publishedAt, tag}`);

  const { data: posts } = await sanityFetch({
    query: POSTS_QUERY,
    params: { searchTerm },
  });

  return posts;
}
