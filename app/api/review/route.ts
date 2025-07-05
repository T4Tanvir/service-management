import { ReviewDto } from "@/dtos/review.dto";
import { NextRequest, NextResponse } from "next/server";
import * as reviewService from "../../../lib/services/review_crud_service";
import { ClientError } from "@/errors/error";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session) throw ClientError.accessDeniedError();

    const services = await reviewService.getAll();
    return NextResponse.json({
      success: true,
      message: "Review Data Fetch successfully",
      data: services,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof ClientError
        ? error.message
        : "Failed to Fetch Review Data";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = new ReviewDto(await req.json());

    //if (!body.isValid()) throw ClientError.invalidError();

    const addedReview = await reviewService.create(body);

    return NextResponse.json({
      success: true,
      message: "Review Added successfully",
      data: addedReview,
    });
    
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof ClientError ? error.message : "Failed to create service";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
