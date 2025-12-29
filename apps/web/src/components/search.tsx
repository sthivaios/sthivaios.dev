"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

function PostSearch(props: { callback: (searchTerm: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full flex flex-row items-center justify-center">
      <Input
        className="w-[25%]"
        placeholder="search for a post..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        onKeyDown={() => {
          props.callback(searchTerm);
        }}
      ></Input>
    </div>
  );
}

export default PostSearch;
