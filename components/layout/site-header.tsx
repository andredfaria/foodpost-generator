"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, MenuIcon, XIcon, LogIn } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/lib/providers/auth-provider";
import { UserMenu } from "./user-menu";

const routes = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile", requiresAuth: true },
  { href: "/generate", label: "Generate Post", requiresAuth: true },
  { href: "/history", label: "Post History", requiresAuth: true },
];

export function SiteHeader() {
  const { setTheme, theme } = useTheme();
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Filter routes based on authentication status
  const visibleRoutes = routes.filter(route => 
    !route.requiresAuth || user
  );

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
      <div className="container mx-auto p-4 flex h-18 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-xl"
          >
            <span className="hidden sm:inline-block">FoodPost</span>
            <span className="text-primary">Generator</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {visibleRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary px-2 py-1 rounded-md",
                  pathname === route.href
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="h-10 w-10"
          >
            {theme === "dark" ? (
              <SunIcon className="h-4 w-4" />
            ) : (
              <MoonIcon className="h-4 w-4" />
            )}
          </Button>

          {/* Authentication Section */}
          {!loading && (
            <>
              {user ? (
                <UserMenu />
              ) : (
                <Link href="/auth/login">
                  <Button variant="default" size="sm" className="hidden md:flex">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}
            </>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-10 w-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <XIcon className="h-4 w-4" />
            ) : (
              <MenuIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-sm">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-2">
            {visibleRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "py-3 px-4 text-base font-medium transition-colors hover:text-primary rounded-md",
                  pathname === route.href
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:bg-muted/50"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            
            {/* Mobile Authentication */}
            {!loading && !user && (
              <Link
                href="/auth/login"
                className="py-3 px-4 text-base font-medium transition-colors hover:text-primary rounded-md text-muted-foreground hover:bg-muted/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogIn className="mr-2 h-4 w-4 inline" />
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}