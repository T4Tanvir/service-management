// app/api/services/route.ts - API routes for services
import { NextRequest, NextResponse } from "next/server";
import * as serviceService from "../../../lib/services/service_crud_service";
import { ServiceDto } from "@/dtos/service.dto";
import { ClientError } from "@/errors/error";

/**
 * GET /api/services - List all services
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const name = searchParams.get("name") ?? undefined;
  let parentId: number | null | undefined = searchParams.get("parentId")
    ? Number(searchParams.get("parentId"))
    : undefined;

  parentId = parentId === 0 ? null : parentId;

  try {
    if (type === "all") {
      const services = await serviceService.getAllServices();
      return NextResponse.json(services);
    }

    if (type === "basic") {
      console.log("Fetching basic service info with params:", {
        name,
        parentId,
      });
      const services = await serviceService.getAllServicesBasicInfo({
        name,
        parentId,
      });
      return NextResponse.json(services);
    }

    if (type === "nested") {
      console.log("Fetching nested service info with params:");
      const services = await serviceService.getNestedServices();
      return NextResponse.json(services);
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof ClientError ? error.message : "Failed to create service";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * POST /api/services - Create a new service
 */
export async function POST(req: NextRequest) {
  try {
    const body = new ServiceDto(await req.json());

    //if (!body.isValid()) throw ClientError.invalidError();

    const service = await serviceService.create(body);

    return NextResponse.json(service, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create service";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
