
import { ClientError } from "@/errors/error";
import { NextRequest, NextResponse } from "next/server";
import * as galleryService from "../../../lib/services/gallery_crud_service";
import { GalleryDto } from "@/dtos/gallery.dto";
import { auth } from "@/auth";

/**
 * GET /api/faq - List all Faqs
 */
export async function GET() {
  try {
    const images = await galleryService.getAll();
    return NextResponse.json({
      success: true,
      message: "Gallery Data Fetch successfully",
      data: images,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof ClientError
        ? error.message
        : "Failed to Fetch Image Data";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * POST /api/faq - Create a new Faq
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) throw ClientError.accessDeniedError();

    const body = new GalleryDto(await req.json());

    const insertedImage = await galleryService.create(body);

    return NextResponse.json({
      success: true,
      message: "Image Added successfully",
      data: insertedImage,
    });
    
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create service";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
