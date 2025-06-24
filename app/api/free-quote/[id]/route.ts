import { FreeQuoteDto } from "@/dtos/freeQuote.dto";
import { ClientError } from "@/errors/error";
import { NextRequest, NextResponse } from "next/server";
import * as free_quote_service from "../../../../lib/services/free_quote_crud_service";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = await params;
    const body = new FreeQuoteDto(await request.json());
    console.log(id, body, "===============");
    if (!id) {
      return Response.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const updatedService = await free_quote_service.editStatus(
      Number(id),
      body
    );

    return Response.json({
      success: true,
      message: "Order updated successfully",
      data: updatedService,
    });
  } catch (error: unknown) {
    //console.log(error, "================");
    const errorMessage =
      error instanceof ClientError ? error.message : "Failed to update Order";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
