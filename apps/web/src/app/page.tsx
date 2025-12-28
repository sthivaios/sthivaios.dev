import React from "react";
import Link from "next/link";

function Page(props) {
  return (
    <div className="p-10 flex flex-col gap-2 items-center justify-center">
      Links:
      <Link
        href="/posts"
        className="font-bold underline hover:text-blue-500 transition duration-200"
      >
        Posts
      </Link>
    </div>
  );
}

export default Page;
