"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useDebounce } from "use-debounce";

function PostSearch(props: { searchCallback: (searchTerm: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  const { searchCallback } = props;

  useEffect(() => {
    searchCallback(debouncedSearchTerm);
  }, [debouncedSearchTerm, searchCallback]);

  return (
    <div className="w-full flex flex-row items-center justify-center">
      <Card className="w-[30%] px-5 flex flex-row gap-2 items-center justify-center h-16">
        <Input
          className="w-full h-full"
          placeholder="search for a post..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        ></Input>
      </Card>
    </div>
  );
}

export default PostSearch;
