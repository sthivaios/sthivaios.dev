import React from "react";
import { defineQuery, PortableText } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { notFound } from "next/navigation";
import { components } from "@/sanity/portableTextComponents";

async function Page() {
  const POST_QUERY = defineQuery(`*[
    _type == "post" &&
    slug.current == "about-me"
  ][0]`);

  const { data: post } = await sanityFetch({
    query: POST_QUERY,
  });
  if (!post) {
    notFound();
  }

  const { title, publishedAt, mainImage, body } = post;

  return (
    <div className="p-10 flex flex-col gap-2 items-center justify-center">
      <div className="flex flex-col justify-center w-[75%] prose-lg prose_pro_max">
        {body ? <PortableText value={body} components={components} /> : null}
      </div>
    </div>
  );
}

export default Page;
