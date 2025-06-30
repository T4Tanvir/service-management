import { auth } from "@/auth";
import { ClientError } from "@/errors/error";
import { NextRequest, NextResponse } from "next/server";
import * as galleryService from "../../../../lib/services/gallery_crud_service";

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

    await galleryService.deleteImage(Number(id));

    // Database update

    return NextResponse.json({
      success: true,
      message: "Image Deleted successfully",
      data: "Image Deleted successfully",
    });
  } catch (error: unknown) {
    //console.log(error);
    const errorMessage =
      error instanceof ClientError ? error.message : "Failed to delete Feature";
    const statusCode = error instanceof ClientError ? 400 : 500;
    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
