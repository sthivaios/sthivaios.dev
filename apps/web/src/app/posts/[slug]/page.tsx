import { defineQuery, PortableText } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { sanityImageUrl } from "@/sanity/image";

import { sanityFetch } from "@/sanity/live";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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

  const imageUrl = mainImage ? sanityImageUrl(mainImage).quality(80).url() : "";

  return (
    <main className="flex flex-col items-center w-full p-10">
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <div className="flex flex-row w-full justify-center items-center gap-20 mt-10 mb-20">
          <div className="w-full max-w-2xl">
            <AspectRatio
              ratio={16 / 9}
              className="bg-muted rounded-lg w-full max-w-2xl"
            >
              <Image
                src={imageUrl}
                alt={title || "Post"}
                className="object-contain rounded-lg"
                fill
              />
            </AspectRatio>
          </div>
          <div className="flex flex-col items-start justify-center text-wrap wrap-normal max-w-[40%] gap-2">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
            >
              ← Back to posts
            </Link>
            <h1 className="font-bold text-3xl mb-6 ">{title}</h1>
            <p>{new Date(publishedAt).toDateString()}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[75%] text-justify mb-30">
          <PortableText value={body}></PortableText>
        </div>
      </div>
    </main>
  );
}
