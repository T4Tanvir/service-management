import { ChangePasswordData } from "@/type/user.type";
import { NextRequest, NextResponse } from "next/server";
import * as user_service from "../../../../../lib/services/user_crud_service";
import { ClientError } from "@/errors/error";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = await params;
    const body: ChangePasswordData = await request.json();

    if (!id) {
      return Response.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const response = await user_service.changePass(Number(id), body);

    return Response.json({
      success: true,
      message: "Password updated successfully",
      data: response,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof ClientError
        ? error.message
        : "Failed to update Password";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
