
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Copy, Link as LinkIcon } from "lucide-react";
// import { toast } from "@/hooks/use-toast";

const UrlShortenForm = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // if (!url) {
    //   toast({
    //     title: "Error",
    //     description: "Please enter a URL",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const randomString = Math.random().toString(36).substring(2, 7);
      setShortenedUrl(`snap.url/${randomString}`);
      setIsLoading(false);
      
      // toast({
      //   title: "URL shortened successfully",
      //   description: "Your URL is ready to share!",
      // });
    }, 1000);
  };

  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(`https://${shortenedUrl}`);
      setCopied(true);
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <LinkIcon className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="url"
                placeholder="Enter your long URL here..."
                className="pl-10"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="bg-brand-600 hover:bg-brand-700"
              disabled={isLoading}
            >
              {isLoading ? "Shortening..." : "Shorten URL"}
            </Button>
          </div>

          {shortenedUrl && (
            <div className="flex items-center gap-3 p-3 bg-secondary rounded-md">
              <div className="flex-1 font-medium text-sm">
                https://{shortenedUrl}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="flex gap-1 items-center"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy
                  </>
                )}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default UrlShortenForm;