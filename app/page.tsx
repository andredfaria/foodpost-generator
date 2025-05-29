import Link from "next/link";
import { ArrowRightIcon, ImageIcon, InstagramIcon, PaletteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Create Engaging Social Media Posts for Your
            <span className="text-primary block mt-2">Food Business</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate beautiful, professionally designed posts for your restaurant, 
            bakery, café or any food business in seconds. Boost your social media 
            presence and attract more customers.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/generate">
                Start Creating Posts
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/profile">
                Setup Your Profile
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Features Designed for Food Businesses
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to create mouth-watering social media content
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="bg-card rounded-lg p-6 transition-all duration-200 hover:shadow-md">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <PaletteIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Customized Branding</h3>
            <p className="mt-2 text-muted-foreground">
              Keep your posts on-brand with your logo, colors, and business identity.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 transition-all duration-200 hover:shadow-md">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <ImageIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Beautiful Food-Focused Posts</h3>
            <p className="mt-2 text-muted-foreground">
              Generate posts that showcase your food in the most appetizing way possible.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 transition-all duration-200 hover:shadow-md">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <InstagramIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Instagram Integration</h3>
            <p className="mt-2 text-muted-foreground">
              Share your posts directly to Instagram with just a click.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-20 bg-muted rounded-lg my-12">
        <div className="mx-auto max-w-4xl text-center px-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Create professional social media content in three simple steps
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3 max-w-5xl mx-auto px-4">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
              1
            </div>
            <h3 className="text-xl font-semibold">Setup Your Profile</h3>
            <p className="mt-2 text-muted-foreground">
              Add your business details, logo, and brand colors.
            </p>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
              2
            </div>
            <h3 className="text-xl font-semibold">Describe Your Post</h3>
            <p className="mt-2 text-muted-foreground">
              Tell us what you want to promote or announce.
            </p>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
              3
            </div>
            <h3 className="text-xl font-semibold">Generate & Share</h3>
            <p className="mt-2 text-muted-foreground">
              Get your beautiful post and share it with your audience.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Boost Your Social Media Presence?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start creating professional posts that attract more customers to your food business.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="/generate">
                Create Your First Post
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}