import { auth } from "@/auth";
import { FaqDto } from "@/dtos/faq.dto";
import { ClientError } from "@/errors/error";
import { NextRequest, NextResponse } from "next/server";
import * as faqService from "../../../lib/services/faq_crud_service";

/**
 * GET /api/faq - List all Faqs
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  try {
    let faqList: FaqDto[] = [];
    if (type === "all") {
      faqList = await faqService.getAll();
    } else if (type === "filterByService") {
      const serviceIdParam = searchParams.get("serviceId");
      const serviceId: number | null =
        serviceIdParam !== null && !isNaN(Number(serviceIdParam))
          ? Number(serviceIdParam)
          : null;
      faqList = await faqService.getFaqByServiceId(serviceId);
    }

    return NextResponse.json({
      success: true,
      message: "Faq Data Fetch successfully",
      data: faqList.map((faq) => new FaqDto(faq)),
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
    const session = await auth();

    if (!session) throw ClientError.accessDeniedError();
    const body = new FaqDto(await req.json());

    const service = await faqService.create(body);

    return NextResponse.json({
      success: true,
      message: "Faq Added successfully",
      data: service,
    });
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create service";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
