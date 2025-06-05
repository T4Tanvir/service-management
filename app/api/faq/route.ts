import { FaqDto } from "@/dtos/faq.dto";
import { ClientError } from "@/errors/error";
import { NextRequest, NextResponse } from "next/server";
import * as faqService from "../../../lib/services/faq_crud_service";

/**
 * GET /api/faq - List all Faqs
 */
export async function GET(req: NextRequest) {
  try {
    const services = await faqService.getAll();
    return NextResponse.json({
      success: true,
      message: "Faq Data Fetch successfully",
      data: services,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof ClientError ? error.message : "Failed to Fetch Faq Data";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * POST /api/faq - Create a new Faq
 */
export async function POST(req: NextRequest) {
  try {
    const body = new FaqDto(await req.json());

    //if (!body.isValid()) throw ClientError.invalidError();

    const service = await faqService.create(body);

    return NextResponse.json({
      success: true,
      message: "Faq Added successfully",
      data: service,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create service";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
