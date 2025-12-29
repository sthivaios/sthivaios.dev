import { defineQuery, PortableText } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { sanityImageUrl } from "@/sanity/image";

import { sanityFetch } from "@/sanity/live";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import SharePostButton from "@/components/share-post-button";
import { components } from "@/sanity/portableTextComponents";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Hourglass } from "lucide-react";
import PostReadingTime from "@/components/postReadingTime";

const POST_QUERY = defineQuery(`*[
    _type == "post" &&
    slug.current == $slug
][0]{title, slug, publishedAt, mainImage, body, "estimatedWordCount": round(length(pt::text(body)) / 5)}`);

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

  const { title, slug, publishedAt, mainImage, body, estimatedWordCount } =
    post;

  const imageUrl = mainImage ? sanityImageUrl(mainImage).quality(80).url() : "";

  return (
    <main className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row w-full justify-center items-center gap-20 mb-20 p-5">
          {imageUrl ? (
            <div className="w-full max-w-2xl">
              <AspectRatio
                ratio={16 / 9}
                className="rounded-lg w-full max-w-2xl"
              >
                <Image
                  src={imageUrl}
                  alt={title || "Post"}
                  className="object-contain rounded-lg"
                  fill
                />
              </AspectRatio>
            </div>
          ) : null}
          <div
            className={
              `flex flex-col items-center sm:items-center ${imageUrl ? "md:items-start lg:items-start" : ""} text-center sm:text-center md:text-start lg:text-start justify-center` +
              "text-wrap wrap-normal max-w-full md:max-w-[40%] lg:max-w-[40%] gap-2"
            }
          >
            <Link
              href="/posts"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
            >
              ← Back to posts
            </Link>
            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl mb-6 ">
              {title}
            </h1>
            <div className="flex flex-row items-center gap-4 h-6">
              {publishedAt ? (
                <div className="flex flex-row items-center gap-2">
                  <Calendar />
                  <p>{new Date(publishedAt).toISOString().slice(0, 10)}</p>
                </div>
              ) : null}
              <Separator orientation={"vertical"} />
              <div className="flex flex-row items-center gap-2">
                <Clock />
                <PostReadingTime body={body} />
              </div>
            </div>
            {slug?.current ? (
              <SharePostButton slug={slug.current} pointerCursor />
            ) : null}
          </div>
        </div>
        <div className="the_good_prose_stuff">
          {body ? <PortableText value={body} components={components} /> : null}
        </div>
      </div>
    </main>
  );
}
