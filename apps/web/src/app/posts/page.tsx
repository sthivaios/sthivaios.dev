import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";

const POSTS_QUERY = defineQuery(`*[
  _type == "post"
  && defined(slug.current)
]|order(date asc){_id, title, slug, publishedAt}`);

export default async function IndexPage() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY });

  console.log(posts);

  return (
    <main className="flex min-h-screen flex-col p-24 gap-12">
      <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-white">
        Posts
      </h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {posts.map((post) => (
          <li
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm dark:shadow-gray-900/20"
            key={post._id}
          >
            <Link
              className="hover:underline block"
              href={`/posts/${post?.slug?.current}`}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {post?.title}
              </h2>
              {post?.publishedAt && (
                <p className="text-gray-500 dark:text-gray-400">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
