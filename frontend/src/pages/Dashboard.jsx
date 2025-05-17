
import UrlShortenForm from "@/components/UrlShortenForm";
import AnalyticsSummary from "@/components/AnalyticsSummary";
import RecentLinks from "@/components/RecentLinks";

const Dashboard = () => {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col gap-8">
        {/* Welcome section */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Create and manage your shortened URLs
          </p>
        </div>

        {/* URL Shortener form */}
        <section className="bg-gradient-to-r from-brand-50 to-secondary rounded-lg p-4 md:p-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-brand-800">Shorten Your URL</h2>
              <p className="text-muted-foreground mt-1">
                Paste your long URL to create a short, memorable link
              </p>
            </div>
            <UrlShortenForm />
          </div>
        </section>

        {/* Analytics Summary */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <AnalyticsSummary />
        </section>

        {/* Recent Links */}
        <section className="pb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Links</h2>
          <RecentLinks />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;