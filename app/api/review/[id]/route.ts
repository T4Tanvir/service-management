import { ReviewDto } from "@/dtos/review.dto";
import { NextRequest, NextResponse } from "next/server";
import * as reviewService from "../../../../lib/services/review_crud_service";
import { ClientError } from "@/errors/error";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = await params;
    console.log(id, "===============");
    const response = await reviewService.deleteReview(Number(id));
    return NextResponse.json({
      success: true,
      message: "Review Deleted successfully",
      data: response.message,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof ClientError
        ? error.message
        : "Failed to Delete Review Data";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
