"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function SharePostButton(props: { slug: string; pointerCursor?: boolean }) {
  const urlToCopy = `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${props.slug}`;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(urlToCopy);
    } catch (e) {
      if (e instanceof Error) {
        toast.error("Could not copy the URL to the clipboard", {
          description: e.message
            ? `Error details: ${e.message}`
            : "Unknown error",
        });
        return;
      }
    }

    toast.info("Copied the URL to the clipboard");
  }

  return (
    <Button
      className={props.pointerCursor ? "hover:cursor-pointer mt-5" : "mt-5"}
      onClick={copyToClipboard}
    >
      Share
    </Button>
  );
}

export default SharePostButton;
