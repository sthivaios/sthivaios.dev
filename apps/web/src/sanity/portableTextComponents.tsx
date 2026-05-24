import { PortableTextComponents } from "next-sanity";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ClickableImage from "@/components/clickableImage";
import {Separator} from "@/components/ui/separator";

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
                  <ClickableImage image={{ imageObject: props.value.image }} />
                </AspectRatio>
              </TooltipTrigger>
            </Tooltip>
            <p className="text-center p-5 text-muted-foreground">
              {props?.value?.caption}
            </p>
          </div>
        </div>
      ) : null,
    divider: () => <Separator className="my-4" />,
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
