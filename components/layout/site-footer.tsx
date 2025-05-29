import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start md:gap-2">
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-xl"
          >
            <span>FoodPost</span>
            <span className="text-primary">Generator</span>
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            Create beautiful social media posts for your food business.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:items-end md:justify-end">
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/profile" className="text-muted-foreground hover:text-foreground">
              Profile
            </Link>
            <Link href="/generate" className="text-muted-foreground hover:text-foreground">
              Generate
            </Link>
            <Link href="/history" className="text-muted-foreground hover:text-foreground">
              History
            </Link>
          </nav>
          <p className="text-center text-sm text-muted-foreground md:text-right">
            &copy; {new Date().getFullYear()} FoodPost Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}