"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/nav-items";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ROUTES } from "@/constants/routes";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Mock login status
  const isLoggedIn = false;

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
        "fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between px-4 md:px-6 py-4 transition-all duration-300",
        scrolled
          ? "bg-destructive border-b border-primary-foreground/10"
          : "bg-secondary"
      )}>
      <div className="flex items-center gap-4">
        <Link
          href={ROUTES.APP.HOME}
          className="text-2xl font-bold italic text-primary-foreground shrink-0">
          <Image src="/logo.svg" alt="Logo" width={100} height={100} />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-md font-medium transition-colors flex items-center gap-2",
              isActive(item.href)
                ? "text-primary-foreground underline underline-offset-4"
                : "text-primary-foreground/80 hover:text-primary-foreground"
            )}>
            <item.icon className="w-4 h-4" />
            {item.name}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <Button
              variant="ghost"
              asChild
              className="text-primary-foreground hover:bg-primary-foreground/10 rounded-full transition-all">
              <Link href={ROUTES.AUTH.LOGIN}>Login</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className={cn(
                "rounded-full border-primary-foreground text-primary-foreground transition-all duration-300",
                scrolled ? "bg-destructive shadow-lg" : "bg-secondary"
              )}>
              <Link href={ROUTES.AUTH.SIGNUP}>Join Now</Link>
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            asChild
            className={cn(
              "rounded-full border-primary-foreground text-primary-foreground transition-all duration-300",
              scrolled ? "bg-destructive shadow-lg" : "bg-secondary"
            )}>
            <Link href={ROUTES.CHAT.ROOT}>My Account</Link>
          </Button>
        )}
      </div>

      {/* Mobile Menu Trigger (Right Side) */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-secondary p-0 border-r border-primary-foreground/10">
            <SheetHeader className="p-6 text-left border-b border-primary-foreground/10">
              <SheetTitle>
                <Image src="/logo.svg" alt="Logo" width={120} height={120} />
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 p-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-lg font-medium transition-colors flex items-center gap-3",
                    isActive(item.href)
                      ? "text-primary-foreground"
                      : "text-primary-foreground/70 hover:text-primary-foreground"
                  )}>
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                {!isLoggedIn ? (
                  <>
                    <Button
                      variant="ghost"
                      asChild
                      className="text-primary-foreground justify-start hover:bg-primary-foreground/10 rounded-xl">
                      <Link href={ROUTES.AUTH.LOGIN}>Login</Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="rounded-xl border-primary-foreground text-primary-foreground bg-secondary">
                      <Link href={ROUTES.AUTH.SIGNUP}>Join Now</Link>
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    asChild
                    className="rounded-xl border-primary-foreground text-primary-foreground bg-secondary">
                    <Link href={ROUTES.CHAT.ROOT}>My Account</Link>
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
