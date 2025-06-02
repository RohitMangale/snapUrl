import { useState } from "react";
import axios from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Copy, Link as LinkIcon, RefreshCcw } from "lucide-react";
import { toast } from "react-toastify";

const UrlShortenForm = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    setIsLoading(true);
    setCopied(false);

    try {
      const response = await axios.post("/shorten", { original_url: url });
      // Adjust to match your backend key
      setShortenedUrl(response.data.short_url);
      toast.success("URL shortened successfully!");
      setUrl("");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to shorten URL");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
      setCopied(true);
      toast.info("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRefresh = () => {
    setShortenedUrl("");
    setCopied(false);
    setUrl("");
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {!shortenedUrl ? (
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
                  required
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
          ) : (
            <div className="flex items-center gap-3 p-3 bg-secondary rounded-md">
              <div className="flex-1 font-medium text-sm truncate">
                {shortenedUrl}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="flex gap-1 items-center"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="text-destructive"
                onClick={handleRefresh}
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default UrlShortenForm;
