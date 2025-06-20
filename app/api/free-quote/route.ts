import { FreeQuoteDto } from "@/dtos/freeQuote.dto";
import { NextRequest, NextResponse } from "next/server";
import * as free_quote_service from "../../../lib/services/free_quote_crud_service";

export async function POST(req: NextRequest) {
  try {
    const body = new FreeQuoteDto(await req.json());
    const msg = await free_quote_service.create(body);

    return NextResponse.json(msg, { status: 201 });
  } catch (error: unknown) {
    //console.log(error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to submit free quote request";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
