import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-12">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <Link
              href="/"
              className="flex items-center space-x-2 font-bold text-xl"
            >
              <span>FoodPost</span>
              <span className="text-primary">Generator</span>
            </Link>
            <p className="text-center text-sm text-muted-foreground md:text-left max-w-xs">
              Create beautiful social media posts for your food business.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4 md:items-end">
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                Profile
              </Link>
              <Link href="/generate" className="text-muted-foreground hover:text-foreground transition-colors">
                Generate
              </Link>
              <Link href="/history" className="text-muted-foreground hover:text-foreground transition-colors">
                History
              </Link>
            </nav>
            <p className="text-center text-xs text-muted-foreground md:text-right mt-2">
              &copy; {new Date().getFullYear()} FoodPost Generator. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}