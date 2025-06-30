import { FeatureDto } from "@/dtos/feature.dto";
import { ClientError } from "@/errors/error";
import { NextRequest, NextResponse } from "next/server";
import * as featureService from "../../../lib/services/feature_crud_service";
import { auth } from "@/auth";

/**
 * GET /api/Feature - List all Features
 */
export async function GET(req: NextRequest) {
  try {
    const services = await featureService.getAll();
    return NextResponse.json({
      success: true,
      message: "Feature Data Fetch successfully",
      data: services,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof ClientError
        ? error.message
        : "Failed to Fetch Feature Data";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * POST /api/Feature - Create a new Feature
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) throw ClientError.accessDeniedError();

    const body = new FeatureDto(await req.json());

    //if (!body.isValid()) throw ClientError.invalidError();

    const service = await featureService.create(body);

    return NextResponse.json({
      success: true,
      message: "Feature Added successfully",
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
