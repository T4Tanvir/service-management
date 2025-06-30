import { auth } from "@/auth";
import { FeatureDto } from "@/dtos/feature.dto";
import { ClientError } from "@/errors/error";
import * as feature_service from "@/lib/services/feature_crud_service";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const session = await auth();
    if (!session) throw ClientError.accessDeniedError();

    const { id } = await params;
    const body = new FeatureDto(await request.json());

    // Validation
    if (!id) {
      return Response.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }
    console.log(id, " id");
    // Database update
    const updatedFeature = await feature_service.edit(Number(id), body);

    return Response.json({
      success: true,
      message: "Feature updated successfully",
      data: updatedFeature,
    });
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof ClientError ? error.message : "Failed to update Feature";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) throw ClientError.accessDeniedError();

    // Await the params before destructuring
    const { id } = await params;

    // Validation
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    // Database update
    const deltedService = await feature_service.deleteFeature(Number(id));

    return NextResponse.json({
      success: true,
      message: "Feature Deleted successfully",
      data: deltedService,
    });
  } catch (error: unknown) {
    //console.log(error);
    const errorMessage =
      error instanceof ClientError ? error.message : "Failed to delete Feature";
    const statusCode = error instanceof ClientError ? 400 : 500;
    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
