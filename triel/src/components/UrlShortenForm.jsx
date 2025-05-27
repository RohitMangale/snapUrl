import { useState } from "react";
import axios from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Copy, Link as LinkIcon } from "lucide-react";
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
    setShortenedUrl("");
    setCopied(false);

    try {
      // Replace this URL with your backend API endpoint
      const response = await axios.post("/shorten", { original_url: url });

      // Assuming backend response format: { shortUrl: "snap.url/abcde" }
      setShortenedUrl(response.data.shortUrl);
      toast.success("URL shortened successfully! Your URL is ready to share.");
      setUrl("");

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to shorten URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(`https://${shortenedUrl}`);
      setCopied(true);

      toast.info("Copied to clipboard!");

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
