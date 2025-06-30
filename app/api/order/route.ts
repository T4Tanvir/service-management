import { ClientError } from "@/errors/error";
import { NextRequest, NextResponse } from "next/server";
import * as orderService from "../../../lib/services/order_crud_service";
import { auth } from "@/auth";

/**
 * GET /api/Order - List all Features
 */
export async function GET() {
  try {
    const session = await auth();
    if (!session) throw ClientError.accessDeniedError();

    const services = await orderService.getAll();
    return NextResponse.json({
      success: true,
      message: "Order Data Fetch successfully",
      data: services,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof ClientError
        ? error.message
        : "Failed to Fetch Order Data";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * POST /api/Orderu - Create a new Feature
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const service = await orderService.create(body);

    return NextResponse.json({
      success: true,
      message: "Order Added successfully",
      data: service,
    });
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof ClientError ? error.message : "Failed to create Order";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
