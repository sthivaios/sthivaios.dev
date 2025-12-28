import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function sanityImageUrl(source: SanityImageSource) {
  return builder.image(source);
}
