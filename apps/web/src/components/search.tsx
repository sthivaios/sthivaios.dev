"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useDebounce } from "use-debounce";
import { TagFilter } from "@/components/tagFilter";
import { TagArray } from "@/app/posts/page";

function PostSearch(props: {
  searchCallback: (searchTerm: string, tagFilter: string[]) => void;
  tags?: TagArray;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [tag, setTag] = useState<string[]>([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  const { searchCallback } = props;

  useEffect(() => {
    searchCallback(debouncedSearchTerm, tag);
  }, [debouncedSearchTerm, tag, searchCallback]);

  return (
    <div className="w-full flex flex-row items-center justify-center">
      <Card className="w-[40%] px-5 flex flex-row gap-2 items-center justify-center h-16">
        <Input
          className="w-full h-full"
          placeholder="search for a post..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        ></Input>
        <TagFilter tags={props.tags} enabled={!!props.tags} callback={setTag} />
      </Card>
    </div>
  );
}

export default PostSearch;
