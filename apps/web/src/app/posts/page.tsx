import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const POSTS_QUERY = defineQuery(`*[
  _type == "post"
  && defined(slug.current)
]|order(date asc){_id, title, slug, publishedAt}`);

export default async function IndexPage() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY });

  return (
    <main className="flex flex-col w-full items-center justify-center gap-10">
      <h1 className="text-4xl font-bold">Posts</h1>
      <ul className="flex flex-col w-[40%] items-center justify-center gap-10">
        {posts.map((post) => (
          <li className="w-full" key={post._id}>
            <Card className="p-5 w-full">
              <Link
                className="hover:underline block"
                href={`/posts/${post?.slug?.current}`}
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {post?.title}
                  </h2>
                  {post?.publishedAt && (
                    <div className="flex flex-row w-full">
                      <Badge className="">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </Badge>
                    </div>
                  )}
                </div>
              </Link>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  );
}
