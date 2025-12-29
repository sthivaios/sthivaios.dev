import Image from "next/image";
import { PortableTextComponents } from "next-sanity";
import { sanityImageUrl } from "@/sanity/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const components: PortableTextComponents = {
  types: {
    inlineImage: (props) =>
      props.value ? (
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col items-center gap-0 w-full max-w-2xl mt-6">
            <Tooltip>
              <TooltipContent align="center" side="bottom">
                You can click on the image to open it in a new tab
              </TooltipContent>
              <TooltipTrigger asChild={true}>
                <AspectRatio
                  ratio={16 / 9}
                  className="rounded-lg w-full max-w-2xl"
                >
                  <Link
                    href={sanityImageUrl(props.value.image).url()}
                    target="_blank"
                  >
                    <Image
                      src={sanityImageUrl(props.value.image)
                        .quality(80)
                        .auto("format")
                        .url()}
                      alt={props?.value?.alt || ""}
                      className="object-contain not-prose rounded-lg"
                      fill
                    />
                  </Link>
                </AspectRatio>
              </TooltipTrigger>
            </Tooltip>
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
