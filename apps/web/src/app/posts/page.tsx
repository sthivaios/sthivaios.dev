"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { sanityImageUrl } from "@/sanity/image";
import PostSearch from "@/components/search";
import { fetchPosts } from "@/app/posts/fetchPosts";
import { useState } from "react";
import { Post } from "@/sanity/types";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  const getPosts = async (searchTerm: string) => {
    const posts = await fetchPosts(searchTerm);
    setPosts(posts);
  };

  return (
    <main className="flex flex-col w-full items-center justify-center gap-10 mt-5">
      {/*<h1 className="text-4xl font-bold">Posts</h1>*/}
      <PostSearch callback={getPosts}></PostSearch>
      <ul className="flex flex-row flex-wrap w-full items-center justify-center gap-10 p-5">
        {posts.length == 0 ? "Woah... looks like there are no posts yet" : null}
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
                      fill
                    />
                  </AspectRatio>
                </div>

                <h2 className="text-xl text-center font-semibold text-wrap line-clamp-2 w-full">
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
