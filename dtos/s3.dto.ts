import { BaseDto } from "./base.dto";

class S3Dto extends BaseDto {
  key: string | null;
  contentType: string;
  putUrl: string;
  publicUrl: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(json: any) {
    super(json);
    this.key = json.key ?? null;
    this.contentType = json.contentType ?? "";
    this.putUrl = json.putUrl ?? "";
    this.publicUrl = json.publicUrl ?? "";
  }
}

export { S3Dto };
