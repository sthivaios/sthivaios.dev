"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TagArray } from "@/app/posts/page";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function TagFilter(props: {
  tags?: TagArray;
  enabled: boolean;
  callback: (tags: string[]) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  if (!props.enabled || !props.tags) {
    return (
      <Button
        variant="outline"
        className="w-56 h-full justify-start hover:bg-blue-500"
        disabled={true}
      >
        {selectedTags ? <>{selectedTags[0]}</> : <>Filter tags...</>}
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="min-w-36 h-full justify-start hover:cursor-pointer"
        >
          {selectedTags.length > 0 ? (
            <>
              {selectedTags.length > 1
                ? `${selectedTags[0]} and ${selectedTags.length - 1} more`
                : selectedTags[0]}
            </>
          ) : (
            "Filter tags..."
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0" align="start">
        <StatusList
          setOpen={setOpen}
          setSelectedTags={setSelectedTags}
          selectedTags={selectedTags}
          tags={props.tags}
          callback={props.callback}
        />
      </PopoverContent>
    </Popover>
  );
}

function StatusList(props: {
  tags: TagArray;
  setOpen: (open: boolean) => void;
  setSelectedTags: (tag: string[]) => void;
  selectedTags: string[];
  callback: (tag: string[]) => void;
}) {
  const toggleTag = (tag: string): void => {
    let selectedTags: string[] = props.selectedTags;
    if (!props.selectedTags.includes(tag)) {
      selectedTags = [...selectedTags, tag];
    } else {
      selectedTags = selectedTags.filter((t) => t !== tag);
    }
    props.setSelectedTags(selectedTags);
    props.callback(selectedTags);
  };

  return (
    <Command>
      <CommandInput placeholder="Search for a tag" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {props.tags.map((tag) => (
            <CommandItem
              key={tag.value}
              value={tag.value}
              onSelect={(value) => {
                toggleTag(value);
              }}
            >
              <div className="flex flex-row items-center gap-2">
                <Checkbox
                  id={`checkbox-${tag.value.replace(" ", "-")}`}
                  checked={props.selectedTags.includes(tag.value)}
                  onCheckedChange={() => {
                    toggleTag(tag.value);
                  }}
                />
                <Label htmlFor={`checkbox-${tag.value.replace(" ", "-")}`}>
                  {tag.label}
                </Label>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
