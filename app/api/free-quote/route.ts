import { FreeQuoteDto } from "@/dtos/freeQuote.dto";
import { NextRequest, NextResponse } from "next/server";
import * as free_quote_service from "../../../lib/services/free_quote_crud_service";
import { ClientError } from "@/errors/error";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session) throw ClientError.accessDeniedError();

    const freeQuoteList = await free_quote_service.getAll();
    return NextResponse.json({
      success: true,
      message: "Order Data Fetch successfully",
      data: freeQuoteList,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof ClientError
        ? error.message
        : "Failed to Fetch free Quote List";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = new FreeQuoteDto(await req.json());
    const msg = await free_quote_service.create(body);

    return NextResponse.json(msg, { status: 201 });
  } catch (error: unknown) {
    //console.log(error);
    const errorMessage =
      error instanceof ClientError
        ? error.message
        : "Failed to submit free quote request";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
