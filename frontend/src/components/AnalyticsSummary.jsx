
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleX, TrendingUp } from "lucide-react";

// type StatCardProps = {
//   title: string;
//   value: string | number;
//   description: string;
//   trend?: number;
//   icon: React.ReactNode;
// };

const StatCard = ({ title, value, description, trend, icon }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription className="flex items-center gap-1 text-xs">
          {trend && trend > 0 ? (
            <>
              <TrendingUp className="text-green-500 h-4 w-4" />
              <span className="text-green-500">{trend}% increase</span>
            </>
          ) : trend && trend < 0 ? (
            <>
              <TrendingUp className="text-red-500 h-4 w-4 transform rotate-180" />
              <span className="text-red-500">{Math.abs(trend)}% decrease</span>
            </>
          ) : null}
          {" "}
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

const AnalyticsSummary = () => {
  // This would come from your API in a real app
  const stats = [
    {
      title: "Total Clicks",
      value: 1482,
      description: "from all links",
      trend: 12,
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Active Links",
      value: 8,
      description: "currently active",
      icon: <LinkIcon className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Inactive Links",
      value: 3,
      description: "inactive for 30+ days",
      trend: -5,
      icon: <CircleX className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
};

// Missing import for LinkIcon
import { Link as LinkIcon } from "lucide-react";

export default AnalyticsSummary;