import { NextRequest, NextResponse } from "next/server";
import * as s3Service from "../../../lib/services/S3/s3";
import { ClientError } from "@/errors/error";
import { S3Dto } from "@/dtos/s3.dto";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) throw ClientError.accessDeniedError();

    const body = new S3Dto(await req.json());

    const url = await s3Service.putObjectUrl(body);
    return NextResponse.json({
      success: true,
      message: "Url generated successfully",
      data: url,
    });
  } catch (error: unknown) {
    console.log(error);
    const errorMessage =
      error instanceof ClientError ? error.message : "Url create not possible";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
