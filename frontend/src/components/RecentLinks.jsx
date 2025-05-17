import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
// import { toast } from "@/hooks/use-toast";


const mockLinks = [
  {
    id: '1',
    originalUrl: 'https://example.com/very/long/url/that/needs/to/be/shortened/for/sharing/on/social/media',
    shortUrl: 'snap.url/a1b2c',
    clicks: 123,
    createdAt: new Date('2025-04-30'),
    lastClickedAt: new Date('2025-05-15'),
  },
  {
    id: '2',
    originalUrl: 'https://another-example.com/blog/how-to-create-short-urls',
    shortUrl: 'snap.url/d4e5f',
    clicks: 57,
    createdAt: new Date('2025-05-05'),
    lastClickedAt: new Date('2025-05-12'),
  },
  {
    id: '3',
    originalUrl: 'https://docs.example.org/getting-started-with-url-shortening',
    shortUrl: 'snap.url/g6h7i',
    clicks: 89,
    createdAt: new Date('2025-05-10'),
    lastClickedAt: new Date('2025-05-14'),
  },
];

const RecentLinks = () => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, shortUrl) => {
    navigator.clipboard.writeText(`https://${shortUrl}`);
    setCopiedId(id);
    // toast({
    //   title: "Copied to clipboard",
    //   description: `https://${shortUrl}`,
    // });

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const truncateUrl = (url) => {
    if (url.length <= 40) return url;
    return url.substring(0, 37) + '...';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Links</CardTitle>
        <CardDescription>Your recently created short links and their performance</CardDescription>
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
            {mockLinks.map((link) => (
              <div key={link.id} className="grid grid-cols-1 md:grid-cols-6 p-4 text-sm items-center gap-4 md:gap-0">
                <div className="md:col-span-2 text-xs sm:text-sm break-all" title={link.originalUrl}>
                  {truncateUrl(link.originalUrl)}
                </div>
                <div className="md:col-span-1 font-medium text-brand-700">
                  {link.shortUrl}
                </div>
                <div className="text-center">
                  {link.clicks}
                </div>
                <div className="text-center text-muted-foreground">
                  {formatDate(link.createdAt)}
                </div>
                <div className="flex justify-end gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleCopy(link.id, link.shortUrl)}
                  >
                    {copiedId === link.id ? 'Copied!' : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button 
                    size="sm"
                    variant="ghost"
                    onClick={() => window.open(`https://${link.shortUrl}`, '_blank')}
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