import { UserDto } from "@/dtos/user.dto";
import { ClientError } from "@/errors/error";
import { NextRequest, NextResponse } from "next/server";
import * as review_service from "../../../../lib/services/review_crud_service";
import * as user_service from "../../../../lib/services/user_crud_service";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = await params;
    const body = new UserDto(await request.json());

    if (!id) {
      return Response.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const updatedService = await user_service.edit(Number(id), body);

    return Response.json({
      success: true,
      message: "User updated successfully",
      data: updatedService,
    });
  } catch (error: unknown) {
    //console.log(error, "================");
    const errorMessage =
      error instanceof ClientError ? error.message : "Failed to update Order";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = await params;
    if (!id) {
      return Response.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const link = await review_service.getreviewLink(Number(id));

    return Response.json({
      success: true,
      message: "User updated successfully",
      data: link,
    });
  } catch (error: unknown) {
    //console.log(error ?? "", "================");
    const errorMessage =
      error instanceof ClientError ? error.message : "Failed to update Order";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
