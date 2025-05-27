import { useEffect, useState } from "react";
import axios from "@/api/axios";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleX, TrendingUp, Link as LinkIcon, BarChart3 } from "lucide-react";

const StatCard = ({ title, value, description, trend, icon }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription className="flex items-center gap-1 text-xs mt-1">
          {typeof trend === 'number' ? (
            <>
              <TrendingUp
                className={`h-4 w-4 ${
                  trend > 0 ? 'text-green-500' : 'text-red-500 rotate-180'
                }`}
              />
              <span className={trend > 0 ? 'text-green-500' : 'text-red-500'}>
                {Math.abs(trend)}% {trend > 0 ? 'increase' : 'decrease'}
              </span>
            </>
          ) : null}
          <span className="text-muted-foreground ml-1">{description}</span>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

const AnalyticsSummary = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token"); // or however you store the auth token
        const res = await axios.get("analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAnalytics(res.data);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading analytics...</p>;
  }

  if (!analytics) {
    return <p className="text-sm text-red-500">Failed to load analytics.</p>;
  }

  const stats = [
    {
      title: "Total Links",
      value: analytics.total_links,
      description: "created by you",
      icon: <BarChart3 className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Clicks",
      value: analytics.total_clicks,
      description: "across all links",
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Active Links",
      value: analytics.active_links,
      description: "clicked in the last 30 days",
      icon: <LinkIcon className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Inactive Links",
      value: analytics.inactive_links,
      description: "no clicks in 30+ days",
      icon: <CircleX className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
};

export default AnalyticsSummary;
