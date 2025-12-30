import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string;
      slug?: { current?: string };
    }>(req, process.env.SANITY_WEBHOOK_SECRET);

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }

    // Revalidate the homepage
    revalidatePath("/");

    // If it's a post, revalidate the posts page and the specific post
    if (body._type === "post") {
      revalidatePath("/posts");
      if (body.slug?.current) {
        revalidatePath(`/posts/${body.slug.current}`);
      }
    }

    // eslint-disable-next-line no-console
    console.info("revalidated successfully");

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
    });
  } catch (err: unknown) {
    return new Response(
      err instanceof Error ? err.message : "Internal Server Error",
      { status: 500 },
    );
  }
}
