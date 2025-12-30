"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Search from "@/components/search";
import { fetchPosts } from "@/app/posts/fetchPosts";
import { useCallback, useState } from "react";
import { sanityImageUrl } from "@/sanity/image";
import { POSTS_QUERY_RESULT } from "@/sanity/types";
import { TriangleAlert } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export type TagArray = {
  value: string;
  label: string;
}[];

export default function IndexPage() {
  const [posts, setPosts] = useState<POSTS_QUERY_RESULT>([]);
  const [tags, setTags] = useState<TagArray>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const generateTagArray = async (fetched: POSTS_QUERY_RESULT) => {
    const tags: TagArray = [];
    fetched.forEach((post) => {
      if (post.tag) {
        tags.push({
          value: post.tag,
          label: post.tag,
        });
      }
    });
    return tags;
  };

  const search = useCallback(async (searchTerm: string, tags: string[]) => {
    setLoading(true);
    const fetched: POSTS_QUERY_RESULT = await fetchPosts(
      searchTerm == "" ? "*" : searchTerm,
    );
    setPosts(
      tags.length == 0
        ? fetched
        : fetched.filter((post) => tags.includes(post.tag ?? "")),
    );
    setTags(await generateTagArray(fetched));
    setLoading(false);
  }, []);

  if (posts == undefined) {
    return (
      <main className="flex flex-col w-full items-center justify-center gap-10 mt-5">
        <Search
          searchCallback={search}
          loadingCallback={setLoading}
          tags={tags}
        />
        <ul className="flex flex-row flex-wrap w-full items-center justify-center gap-10 p-5">
          <div className="flex flex-col justify-center items-center gap-4">
            <TriangleAlert />
            <p className="text-center">
              Well this is embarrassing...
              <br />
              There was an error fetching the posts
            </p>
          </div>
        </ul>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex flex-col w-full items-center justify-center gap-10 mt-5">
        <Search
          searchCallback={search}
          loadingCallback={setLoading}
          tags={tags}
        />
        <ul className="flex flex-row flex-wrap w-full items-center justify-center gap-10 p-5">
          <div className="flex flex-col justify-center items-center gap-4">
            <Spinner className="size-8" />
            <p className="text-center">Loading...</p>
          </div>
        </ul>
      </main>
    );
  }

  return (
    <main className="flex flex-col w-full items-center justify-center gap-10 mt-5">
      <Search
        searchCallback={search}
        loadingCallback={setLoading}
        tags={tags}
      />
      <ul className="flex flex-row flex-wrap w-full items-center justify-center gap-10 p-5">
        {posts.length == 0 ? "Woah... no posts found" : null}
        {posts.map((post) => (
          <li className="" key={post._id}>
            <Link className="block" href={`/posts/${post?.slug?.current}`}>
              <Card className="p-3 w-min flex flex-col gap-2 h-96 items-stretch justify-between post_card_hover">
                <div className="w-full min-w-xs sm:min-w-sm md:min-w-sm lg:min-w-sm">
                  <AspectRatio
                    ratio={16 / 9}
                    className="rounded-lg w-full max-w-2xl"
                  >
                    <Image
                      src={sanityImageUrl(post?.mainImage ?? "")
                        .quality(100)
                        .height(1200)
                        .url()}
                      alt={post?.title || "Post"}
                      className="object-contain rounded-lg"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 672px"
                      loading="eager"
                      fill
                    />
                  </AspectRatio>
                </div>

                <h2 className="text-xl text-justify font-semibold text-wrap line-clamp-2 w-full">
                  {post?.title}
                </h2>

                <div className="flex flex-row w-full justify-between">
                  {post?.publishedAt && (
                    <Badge className="">
                      {new Date(post.publishedAt).toISOString().slice(0, 10)}
                    </Badge>
                  )}
                  {post?.tag ? (
                    <Badge className="">Tag: {post.tag}</Badge>
                  ) : null}
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
