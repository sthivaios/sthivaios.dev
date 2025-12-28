import Image from "next/image";
import { PortableTextComponents } from "next-sanity";
import { sanityImageUrl } from "@/sanity/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

export const components: PortableTextComponents = {
  types: {
    inlineImage: (props) =>
      props.value ? (
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col items-center gap-0 w-full max-w-2xl mt-6">
            <AspectRatio ratio={16 / 9} className="rounded-lg w-full max-w-2xl">
              <Image
                src={sanityImageUrl(props.value.image)
                  .quality(80)
                  .auto("format")
                  .url()}
                alt={props?.value?.alt || ""}
                className="object-contain not-prose"
                fill
              />
            </AspectRatio>
            <p className="text-center px-5 text-muted-foreground">
              {props?.value?.caption}
            </p>
          </div>
        </div>
      ) : null,
  },
  marks: {
    link: ({ value, children }) => {
      const target = value?.href?.startsWith("http") ? "_blank" : undefined;

      return (
        <Link href={value?.href} target={target} className="hyperlink">
          {children}
        </Link>
      );
    },
  },
};
