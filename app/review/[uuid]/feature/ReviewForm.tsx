"use client";

import type React from "react";

import NestedServiceForm from "@/components/NestedServiceForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReviewDto } from "@/dtos/review.dto";
import { addReview } from "@/lib/api-client/review";
import { getServicesNestedInfo } from "@/lib/api-client/service";
import { NestedService } from "@/type/service.type";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface ReviewFormProps {
  reviewId: string;
}

export function ReviewForm({ reviewId }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    mobile: "",
    rating: 0,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [services, setServices] = useState<NestedService[]>([]);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.mobile || !formData.rating || !formData.comment) {
      setError("Please fill in all fields!");
      return;
    }

    setIsSubmitting(true);

    const dataNeedToPass = new ReviewDto({
      phone_number: formData.mobile,
      service_id: selectedService,
      rating: formData.rating,
      comment: formData.comment,
      review_permit_uuid: reviewId,
    });
    try {
      const result = await addReview(dataNeedToPass);
      if (result.success) {
        setSubmitted(true);
      }
      setSubmitted(true);
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const nestedEffect = async () => {
      const nServices = await getServicesNestedInfo();
      setServices(nServices);
    };
    nestedEffect();
  }, []);

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
        <p className="text-muted-foreground">
          Your review has been submitted successfully.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="mobile">Mobile Number *</Label>
        <Input
          id="mobile"
          type="tel"
          placeholder="01XXXXXXXXX"
          value={formData.mobile}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, mobile: e.target.value }))
          }
          required
        />
      </div>

      <div className="space-y-2">
        <NestedServiceForm
          services={services}
          onServiceSelect={setSelectedService}
        />
      </div>

      <div className="space-y-2">
        <Label>Give a Rating *</Label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingClick(star)}
              className="focus:outline-none cursor-pointer"
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            >
              <Star
                className={`h-8 w-8 transition-colors ${
                  star <= formData.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 hover:text-yellow-200"
                }`}
              />
            </button>
          ))}
        </div>
        {formData.rating > 0 && (
          <p className="text-sm text-muted-foreground">
            You have given {formData.rating} star(s)
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Comment *</Label>
        <Textarea
          id="comment"
          placeholder="Write details about your experience..."
          value={formData.comment}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, comment: e.target.value }))
          }
          rows={4}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
