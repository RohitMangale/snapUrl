import { useEffect, useState } from "react";
import axios from "@/api/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast"; // Uncomment if using toast

const RecentLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  // const { toast } = useToast();

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const token = localStorage.getItem("token"); // or however you're storing JWT
        const response = await axios.get("/my-urls", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLinks(response.data);
      } catch (err) {
        console.error("Error fetching URLs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const handleCopy = (id, shortUrl) => {
    navigator.clipboard.writeText(`https://${shortUrl}`);
    setCopiedId(id);
    // toast({
    //   title: "Copied to clipboard",
    //   description: `https://${shortUrl}`,
    // });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateStr) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(new Date(dateStr));
  };

  const truncateUrl = (url) => {
    if (url.length <= 40) return url;
    return url.substring(0, 37) + "...";
  };

  if (loading) {
    return <div>Loading recent links...</div>;
  }

  return (
    <Card>
      <CardHeader>
        {/* <CardTitle>Recent Links</CardTitle> */}
        <CardDescription>
          Your recently created short links and their performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-1 md:grid-cols-6 p-4 text-sm font-medium text-muted-foreground">
            <div className="md:col-span-2">Original URL</div>
            <div className="md:col-span-1">Short URL</div>
            <div className="text-center">Clicks</div>
            <div className="text-center">Created</div>
            <div className="text-right">Actions</div>
          </div>
          <div className="divide-y">
            {links.map((link) => (
              <div
                key={link.id}
                className="grid grid-cols-1 md:grid-cols-6 p-4 text-sm items-center gap-4 md:gap-0"
              >
                <div
                  className="md:col-span-2 text-xs sm:text-sm break-all"
                  title={link.original_url}
                >
                  {truncateUrl(link.original_url)}
                </div>
                <a href={`http://localhost:8080/${link.short_code}`} target="blank" className="md:col-span-1 font-medium text-brand-700">
                  {`snapUrl.com/${link.short_code}`}
                </a>
                <div className="text-center">{link.clicks}</div>
                <div className="text-center text-muted-foreground">
                  {formatDate(link.created_at)}
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      handleCopy(link.id, `snap.url/${link.short_code}`)
                    }
                  >
                    {copiedId === link.id ? "Copied!" : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      window.open(`https://snap.url/${link.short_code}`, "_blank")
                    }
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentLinks;
