import { S3Dto } from "@/dtos/s3.dto";
import { ClientError } from "@/errors/error";
import s3Client from "@/uitls/s3";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function getPresignedUrl(
  key: string,
  expiresInMinutes = 60
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: "peace-home-test-image-bucket",
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: expiresInMinutes * 60,
  });
  return url;
}

export async function putObjectUrl(
  data: S3Dto,
  expiresInMinutes = 60
): Promise<S3Dto> {
  if (!data.key || !data.contentType) {
    throw ClientError.invalidError();
  }
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: data.key!,
    ContentType: data.contentType,
  });

  const putObjectUrl = await getSignedUrl(s3Client, command, {
    expiresIn: expiresInMinutes * 60,
  });

  return new S3Dto({
    putUrl: putObjectUrl,
    publicUrl: `https://${process.env.S3_BUCKET_NAME}.s3.${
      process.env.S3_REGION
    }.amazonaws.com/${encodeURIComponent(data.key)}`,
  });
}

export async function deleteObject(key: string): Promise<void> {
  if (!key) {
    throw ClientError.invalidError();
  }

  const command = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  });

  const response = await s3Client.send(command);
  console.log(response);
}
