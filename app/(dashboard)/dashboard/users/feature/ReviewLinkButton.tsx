"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, ExternalLink } from "lucide-react";
//import { generateReviewLink } from "@/lib/actions"
import { editUser } from "@/lib/api-client/user";
import { getreviewLink } from "@/lib/api-client/review";

interface ReviewLinkButtonProps {
  user: userDto;
}

export function ReviewLinkButton({ user }: ReviewLinkButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reviewUrl, setReviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");

  const handleGenerateLink = async () => {
    setIsLoading(true);
    try {
      const result = await getreviewLink(user.id);
      console.log(result);
      if (result.success) {
        setReviewUrl(result.data);
        setMessage("Review link has been generated!");
      }
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(reviewUrl);
      setCopied(true);
      setMessage("Link has been copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setMessage("Failed to copy the link!");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review Link for {user.full_name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {message && (
            <div className="p-3 bg-green-100 text-green-800 rounded-md text-sm">
              {message}
            </div>
          )}

          {!reviewUrl ? (
            <Button
              onClick={handleGenerateLink}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Generating..." : "Generate Review Link"}
            </Button>
          ) : (
            <div className="space-y-3">
              <Label htmlFor="review-url">Review Link:</Label>
              <div className="flex space-x-2">
                <Input
                  id="review-url"
                  value={reviewUrl}
                  readOnly
                  className="flex-1"
                />
                <Button size="icon" variant="outline" onClick={copyToClipboard}>
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => window.open(reviewUrl, "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Send this link to the user so they can submit a review.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
