import { OrderDto } from "@/dtos/order.dto";
import { NextRequest, NextResponse } from "next/server";
import * as order_crud_service from "../../../../lib/services/order_crud_service";
import { ClientError } from "@/errors/error";

export async function PUT(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  try {
    const { uuid } = await params;
    const body = new OrderDto(await request.json());

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    // Validation
    if (!uuid) {
      return Response.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }
    let updatedService;
    // Database update
    if (type === "order") {
      updatedService = await order_crud_service.edit(uuid, body);
    }

    if (type === "status") {
      updatedService = await order_crud_service.editStatus(uuid, body);
    }

    return Response.json({
      success: true,
      message: "Order updated successfully",
      data: updatedService,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof ClientError ? error.message : "Failed to update Order";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
