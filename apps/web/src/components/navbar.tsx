"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const navbarItems: { href: string; label: string; key: number }[] = [
  {
    label: "Home",
    href: "/",
    key: 1,
  },
  {
    label: "Posts",
    href: "/posts",
    key: 2,
  },
];

function Navbar() {
  const currentPath = usePathname();

  return (
    <Card className="w-[75%] lg:w-[50%] flex flex-row items-center justify-center relative">
      {navbarItems.map((item) => (
        <Link
          className={`text-lg ${currentPath == item.href ? "font-bold" : "text-muted-foreground"}`}
          href={item.href}
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
