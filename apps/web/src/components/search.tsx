"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";

function PostSearch(props: { callback: (searchTerm: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("Hello");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  useEffect(() => {
    props.callback(debouncedSearchTerm);
  }, [debouncedSearchTerm, props.callback]);

  return (
    <div className="w-full flex flex-row items-center justify-center">
      <Input
        className="w-[25%]"
        placeholder="search for a post..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      ></Input>
    </div>
  );
}

export default PostSearch;
