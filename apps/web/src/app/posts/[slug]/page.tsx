import { defineQuery, PortableText } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/live";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import SharePostButton from "@/components/share-post-button";
import { components } from "@/sanity/portableTextComponents";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock } from "lucide-react";
import PostReadingTime from "@/components/postReadingTime";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ClickableImage from "@/components/clickableImage";

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

  return (
    <main className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-row w-full justify-center items-center gap-20 mb-20 p-5">
          {mainImage ? (
            <div className="w-full max-w-2xl">
              <Tooltip>
                <TooltipContent align="center" side="bottom">
                  You can click on the image to open it in a new tab
                </TooltipContent>
                <TooltipTrigger asChild={true}>
                  <AspectRatio
                    ratio={16 / 9}
                    className="rounded-lg w-full max-w-2xl"
                  >
                    <ClickableImage
                      image={{ imageObject: mainImage }}
                      postSlug={slug?.current}
                    />
                  </AspectRatio>
                </TooltipTrigger>
              </Tooltip>
            </div>
          ) : null}
          <div
            className={
              `flex flex-col items-center sm:items-center ${mainImage ? "md:items-center lg:items-center xl:items-start" : ""} text-center sm:text-center md:text-center lg:text-center xl:text-start justify-center` +
              "text-wrap wrap-normal max-w-full md:max-w-[70%] lg:max-w-[70%] xl:max-w-[40%] gap-2"
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
