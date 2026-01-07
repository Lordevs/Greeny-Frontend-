"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/nav-items";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ROUTES } from "@/constants/routes";

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="flex w-full bg-secondary items-center justify-between px-6 py-4">
      <Link
        href={ROUTES.APP.HOME}
        className="text-2xl font-bold italic text-primary-foreground">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
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
        className="bg-secondary rounded-full border-primary-foreground text-primary-foreground">
        My Account
      </Button>
    </nav>
  );
};

export default Navbar;
