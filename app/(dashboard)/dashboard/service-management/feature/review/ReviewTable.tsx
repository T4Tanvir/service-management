"use client";

import TableLoading from "@/components/TableLoading";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteConfirmDialog } from "@/components/ui/confirmationDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReviewDto } from "@/dtos/review.dto";
import { deleteReview, getAllReview } from "@/lib/api-client/review";
import { Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ReviewTable() {
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState({
    table: true,
    delete: false,
  });
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(
    new Set()
  );

  const handleDelete = async () => {
    setIsLoading((prev) => ({ ...prev, delete: true }));

    try {
      await deleteReview(selectedId!);
      setReviews(reviews.filter((review) => review.id !== selectedId));
      setSelectedId(null);
      toast.success("Review deleted successfully");
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review. Please try again.");
    } finally {
      setIsLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  const toggleReviewExpansion = (reviewId: number) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await getAllReview();
      setReviews(response.data);
      setIsLoading({
        table: false,
        delete: false,
      });
    };
    fetchReviews();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Review Management
          </CardTitle>
          <CardDescription>View and manage customer reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading.table ? (
                  <TableLoading title={"Reviews"} />
                ) : (
                  reviews.map((review, index) => (
                    <TableRow key={review.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-medium">
                              {review?.user?.full_name || ""}
                            </div>
                            <div className="text-sm text-gray-500">
                              {review?.user?.phone_number}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {review?.service?.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {renderStars(review?.rating || 0)}
                          <span className="ml-2 text-sm text-gray-600">
                            ({review.rating}/5)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="space-y-2">
                          <div
                            className={
                              expandedReviews.has(review.id)
                                ? ""
                                : "line-clamp-2"
                            }
                          >
                            {review.comment}
                          </div>
                          {(review?.comment?.length ?? 0) > 100 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleReviewExpansion(review.id)}
                              className="h-6 px-2 text-xs text-blue-600 hover:text-blue-800"
                            >
                              {expandedReviews.has(review.id)
                                ? "Show less"
                                : "Show more"}
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(review.created_at).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-red-50 text-red-600 hover:bg-red-100"
                          onClick={() => setSelectedId(review.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {!isLoading.table && reviews.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No reviews found
            </div>
          )}
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        open={!!selectedId}
        onOpenChange={(open) => !open && setSelectedId(null)}
        onConfirm={() => selectedId && handleDelete()}
        title="Delete FAQ"
        description="Are you sure you want to delete this FAQ? This action cannot be undone."
        isLoading={isLoading.delete}
      />
    </div>
  );
}
