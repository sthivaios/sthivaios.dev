import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const POSTS_QUERY = defineQuery(`*[
  _type == "post"
  && defined(slug.current)
  && slug.current != "about-me"
]|order(date asc){_id, title, slug, publishedAt}`);

export default async function IndexPage() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY });

  return (
    <main className="flex flex-col w-full items-center justify-center gap-10 mt-5">
      <h1 className="text-4xl font-bold">Posts</h1>
      <ul className="flex flex-col w-[80%] md:w-[40%] lg:w-[40%] items-center justify-center gap-10">
        {posts.length == 0 ? "Woah... looks like there are no posts yet" : null}
        {posts.map((post) => (
          <li className="w-full" key={post._id}>
            <Card className="p-5 w-full flex flex-col gap-2">
              <Link
                className="hover:underline block"
                href={`/posts/${post?.slug?.current}`}
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {post?.title}
                </h2>
              </Link>
              {post?.publishedAt && (
                <div className="flex flex-row w-full">
                  <Badge className="">
                    {new Date(post.publishedAt).toISOString().slice(0, 10)}
                  </Badge>
                </div>
              )}
            </Card>
          </li>
        ))}
      </ul>
    </main>
  );
}
