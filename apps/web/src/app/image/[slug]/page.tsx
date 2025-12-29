import Link from "next/link";
import Image from "next/image";
import { sanityImageUrl } from "@/sanity/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default async function EventPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ post_id: string }>;
}) {
  const { slug } = await params;
  const awaitedSearchParams = await searchParams;

  const imageObject = {
    _type: "image",
    asset: {
      _ref: slug,
      _type: "reference",
    },
  };

  const imageUrl = imageObject
    ? sanityImageUrl(imageObject).quality(80).url()
    : "";

  return (
    <main className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <div className="flex flex-col w-full justify-center items-center gap-5 mb-20 p-15">
          <Link
            href={`/posts/${awaitedSearchParams?.post_id}`}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ← Back to the post
          </Link>
          {imageUrl ? (
            <div className="w-full max-w-full">
              <AspectRatio
                ratio={16 / 9}
                className="rounded-lg w-full max-w-full"
              >
                <Image
                  src={imageUrl}
                  alt={"alt text"}
                  className="object-contain rounded-lg"
                  fill
                />
              </AspectRatio>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
