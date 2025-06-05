import { ServiceDto } from "@/dtos/service.dto";
import { ClientError } from "@/errors/error";
import {
  deleteService,
  updateService,
} from "@/lib/services/service_crud_service";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = params;
    const body = new ServiceDto(await request.json());

    // Validation
    if (!id) {
      return Response.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    // Database update
    const updatedService = await updateService(Number(id), body);

    return Response.json({
      success: true,
      message: "User updated successfully",
      data: updatedService,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof ClientError ? error.message : "Failed to create service";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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
    const updatedService = await deleteService(Number(id));

    return NextResponse.json({
      success: true,
      message: "Service Deleted successfully",
      data: updatedService,
    });
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof ClientError ? error.message : "Failed to delete service";
    const statusCode = error instanceof ClientError ? 400 : 500;
    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
