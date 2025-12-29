"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";

function PostSearch() {
  return <Input className="w-[25%]" placeholder="search for a post..."></Input>;
}

export default PostSearch;
