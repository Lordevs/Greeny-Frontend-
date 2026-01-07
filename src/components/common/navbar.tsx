"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/nav-items";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ROUTES } from "@/constants/routes";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-all duration-300",
        scrolled
          ? "bg-destructive border-b border-primary-foreground/10"
          : "bg-secondary"
      )}>
      <Link
        href={ROUTES.APP.HOME}
        className="text-2xl font-bold italic text-primary-foreground">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      </Link>

      <div className="flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-md font-medium transition-colors",
              isActive(item.href)
                ? "text-primary-foreground underline underline-offset-4"
                : "text-primary-foreground/80 hover:text-primary-foreground"
            )}>
            {item.name}
          </Link>
        ))}
      </div>

      <Button
        variant="outline"
        size="default"
        className={cn(
          "rounded-full border-primary-foreground text-primary-foreground transition-all duration-300",
          scrolled ? "bg-destructive" : "bg-secondary"
        )}>
        My Account
      </Button>
    </nav>
  );
}
