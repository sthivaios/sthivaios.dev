import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sanityImageUrl } from "@/sanity/image";
import {
  SanityImageAssetReference,
  SanityImageHotspot,
  SanityImageCrop,
} from "@/sanity/types";

function ClickableImage(props: {
  image: {
    imageObject?: {
      asset?: SanityImageAssetReference;
      media?: unknown;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
    imageRef?: string;
  };
  altText?: string;
  postSlug?: string;
}) {
  if (props.image.imageObject) {
    const imageUrl = sanityImageUrl(props.image.imageObject).quality(80).url();

    return (
      <Link
        href={`/image/${props.image.imageObject.asset?._ref}${props.postSlug ? `?post_id=${props.postSlug}` : ""}`}
      >
        <Image
          src={imageUrl}
          alt={props.altText || "Post"}
          className="object-contain rounded-lg"
          fill
        />
      </Link>
    );
  } else {
    const constructedImageObject = {
      _type: "image",
      asset: {
        _ref: props.image.imageRef,
        _type: "reference",
      },
    };

    const imageUrl = sanityImageUrl(constructedImageObject).quality(80).url();

    return (
      <Link
        href={`/image/${props.image.imageRef}${props.postSlug ? `?post_id=${props.postSlug}` : ""}`}
      >
        <Image
          src={imageUrl}
          alt={props.altText || "Post"}
          className="object-contain rounded-lg"
          fill
        />
      </Link>
    );
  }
}

export default ClickableImage;
