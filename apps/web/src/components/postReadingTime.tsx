"use server";

import React from "react";
import { Post } from "@/sanity/types";

const averageHumanReadingWPM: number = 200;

// this little component is supposed to find out how many words the body of the post has, and then
// estimate the reading time based on that

async function PostReadingTime(props: { body: Post["body"] }) {
  if (!props.body) {
    return null;
  }

  let lengthInWords: number = 0;

  // disgusting code that counts words:
  props.body
    .filter((item) => item._type == "block")
    .forEach((item) => {
      if (!item.children) {
        return null;
      }

      item.children
        .filter((child) => child._type == "span")
        .forEach((child) => {
          if (!child.text) {
            return null;
          }
          lengthInWords = lengthInWords + child.text.split(" ").length;
        });
    });

  const lengthInMinutes: number = lengthInWords / averageHumanReadingWPM;

  return <div>~{lengthInMinutes.toFixed(0)}min</div>;
}

export default PostReadingTime;
