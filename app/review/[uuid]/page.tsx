import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { ReviewForm } from "./feature/ReviewForm";
import { validateAndGetReviewLink } from "@/lib/services/review_crud_service";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ReviewPageProps {
  params: Promise<{ uuid: string }>;
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { uuid } = await params;
  const reviewData = await validateAndGetReviewLink(uuid);

  if (!reviewData.success) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-md">
        <div className="mb-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Peace Home Empire</CardTitle>
            <p className="text-muted-foreground">
              Share your feedback about the quality of this service
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <ReviewForm reviewId={uuid} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
