"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, MenuIcon, XIcon } from "lucide-react";
import { useTheme } from "next-themes";

const routes = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/generate", label: "Generate Post" },
  { href: "/history", label: "Post History" },
];

export function SiteHeader() {
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-background"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-xl"
          >
            <span className="hidden sm:inline-block">FoodPost</span>
            <span className="text-primary">Generator</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container py-4 flex flex-col">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "py-2 text-base font-medium transition-colors hover:text-primary",
                  pathname === route.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}