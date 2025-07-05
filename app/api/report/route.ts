import { NextRequest, NextResponse } from "next/server";
import * as report_service from "../../../lib/services/report_crud_service";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!startDate || !endDate) {
    return NextResponse.json(
      { error: "Missing date range parameters" },
      { status: 400 }
    );
  }

  try {
    const report = await report_service.generateServiceReport(
      new Date(startDate),
      new Date(endDate)
    );
    return NextResponse.json(report);
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch report data" },
      { status: 500 }
    );
  }
}
