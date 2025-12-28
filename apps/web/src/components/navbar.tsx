"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

// the reason that href is an array is that certain browsers and stuff might remove the "/" on home so Home in the navbar isnt bold.
// so instead it matches against any of the strings in each href array
const navbarItems: { href: string[]; label: string; key: number }[] = [
  {
    label: "Home",
    href: ["/", ""],
    key: 1,
  },
  {
    label: "Posts",
    href: ["/posts"],
    key: 2,
  },
];

function Navbar() {
  const currentPath = usePathname();

  return (
    <Card className="w-[75%] lg:w-[50%] flex flex-row items-center justify-center relative">
      {navbarItems.map((item) => (
        <Link
          className={`text-lg ${item.href.includes(currentPath) ? "font-bold" : "text-muted-foreground"}`}
          href={item.href[0]}
          key={item.key}
        >
          {item.label}
        </Link>
      ))}
      <div className="absolute right-4">
        <ThemeToggle />
      </div>
    </Card>
  );
}

export default Navbar;
