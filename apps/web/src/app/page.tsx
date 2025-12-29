import React from "react";
import { defineQuery, PortableText } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { notFound } from "next/navigation";
import { components } from "@/sanity/portableTextComponents";

async function Page() {
  const ABOUTME_QUERY = defineQuery(`*[
    _type == "post" &&
    slug.current == "about-me"
  ][0]`);

  const { data: post } = await sanityFetch({
    query: ABOUTME_QUERY,
  });
  if (!post) {
    notFound();
  }

  const { body } = post;

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div className="the_good_prose_stuff">
        {body ? <PortableText value={body} components={components} /> : null}
      </div>
    </div>
  );
}

export default Page;
