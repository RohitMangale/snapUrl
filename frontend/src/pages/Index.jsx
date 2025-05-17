
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-brand-700">SnapURL</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link to="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link to="/login" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                Log in
              </Link>
              <Link to="/signup">
                <Button className="bg-brand-600 hover:bg-brand-700">Sign up</Button>
              </Link>
            </nav>
            <div className="md:hidden">
              <Button variant="ghost">
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex items-center bg-gradient-to-b from-secondary/40 to-background">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                <span className="text-brand-700">Shorten</span> Your Links,{" "}
                <span className="text-brand-700">Expand</span> Your Reach
              </h1>
              <p className="text-xl text-muted-foreground">
                Create memorable, trackable short links in seconds. Perfect for
                social media, marketing campaigns, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-brand-600 hover:bg-brand-700">Get Started Free</Button>
                </Link>
                <Link to="/features">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-brand-700 rounded-lg blur-xl opacity-30"></div>
              <div className="relative bg-white p-6 rounded-lg shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="border rounded-md p-3 bg-gray-50 flex items-center justify-between">
                    <div className="truncate text-sm text-gray-500">https://example.com/very/long/url...</div>
                  </div>
                  <div className="border-b"></div>
                  <div className="border rounded-md p-3 bg-secondary flex items-center justify-between">
                    <div className="text-sm font-medium text-brand-700">snap.url/a1b2c</div>
                    <div className="bg-brand-100 text-brand-800 text-xs px-2 py-1 rounded">
                      123 clicks
                    </div>
                  </div>
                  <div className="h-40 border rounded-md p-3 bg-gray-50 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <p className="mt-2 text-sm">Analytics Dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose SnapURL?</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our powerful URL shortener gives you everything you need to share and track your links.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-brand-100 flex items-center justify-center rounded-lg mb-4">
                <svg className="h-6 w-6 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Create short links in seconds and share them instantly on any platform.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-brand-100 flex items-center justify-center rounded-lg mb-4">
                <svg className="h-6 w-6 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Analytics</h3>
              <p className="text-muted-foreground">
                Track clicks, referrers, locations, and devices with our comprehensive dashboard.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-brand-100 flex items-center justify-center rounded-lg mb-4">
                <svg className="h-6 w-6 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-muted-foreground">
                Your links are always available with our 99.9% uptime guarantee and security protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-brand-50 border border-brand-100 rounded-xl p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-brand-800">Ready to start shortening?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of marketers and content creators who trust SnapURL for their link management.
              </p>
              <div className="mt-8">
                <Link to="/signup">
                  <Button size="lg" className="bg-brand-600 hover:bg-brand-700">
                    Get Started For Free
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                No credit card required. Free plan includes up to 100 links/month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/20 border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <span className="text-xl font-bold text-brand-700">SnapURL</span>
              <p className="mt-2 text-sm text-muted-foreground">
                Shorten. Share. Track.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/integrations" className="text-sm text-muted-foreground hover:text-foreground">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="text-sm text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/developers" className="text-sm text-muted-foreground hover:text-foreground">
                    Developers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-muted-foreground">
              © 2025 SnapURL. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
