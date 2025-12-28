import { defineQuery, PortableText } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";

import { sanityFetch } from "@/sanity/live";

const POST_QUERY = defineQuery(`*[
    _type == "post" &&
    slug.current == $slug
][0]`);

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: await params,
  });
  if (!post) {
    notFound();
  }

  const { title, slug, publishedAt, mainImage, body } = post;

  const postDate = new Date(publishedAt).toDateString();

  const imageUrl = "https://placehold.co/550x310/png";

  return (
    <main className="flex flex-col items-center w-full p-10">
      <div className="flex flex-row justify-start w-full">
        <Link
          href="/"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
        >
          ← Back to posts
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <h1 className="font-bold text-3xl mb-6">{title}</h1>
        <img
          src={imageUrl}
          alt={title || "Event"}
          className="border-3 border-black"
          height="310"
          width="550"
        />
        <div className="border-1 w-[75%] my-5 border-gray-800"></div>
        <PortableText value={body}></PortableText>
      </div>
    </main>
  );
}
