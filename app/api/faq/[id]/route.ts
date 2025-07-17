import { auth } from "@/auth";
import { FaqDto } from "@/dtos/faq.dto";
import { ClientError } from "@/errors/error";
import * as faq_service from "@/lib/services/faq_crud_service";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const session = await auth();
    if (!session) throw ClientError.accessDeniedError();

    const { id } = await params;
    const body = new FaqDto(await request.json());

    // Validation
    if (!id) {
      return Response.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }
    // Database update
    const updatedService = await faq_service.edit(Number(id), body);

    return Response.json({
      success: true,
      message: "Faq updated successfully",
      data: updatedService,
    });
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof ClientError ? error.message : "Failed to update Faq";
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
    const deltedService = await faq_service.deleteFaq(Number(id));

    return NextResponse.json({
      success: true,
      message: "Faq Deleted successfully",
      data: deltedService,
    });
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof ClientError ? error.message : "Failed to delete Faq";
    const statusCode = error instanceof ClientError ? 400 : 500;
    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
