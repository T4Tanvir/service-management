import { UserDto } from "@/dtos/user.dto";
import { ClientError } from "@/errors/error";
import { NextRequest, NextResponse } from "next/server";
import * as user_service from "../../../lib/services/user_crud_service";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session) throw ClientError.accessDeniedError();

    const freeQuoteList = await user_service.getAll();
    return NextResponse.json({
      success: true,
      message: "User Data Fetch successfully",
      data: freeQuoteList,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof ClientError
        ? error.message
        : "Failed to Fetch User Data";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = new UserDto(await req.json());
    const response = await user_service.create(body);

    return NextResponse.json({
      success: true,
      message: "User Add successfully",
      data: response,
    });
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof ClientError ? error.message : "Failed to Add New User";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
