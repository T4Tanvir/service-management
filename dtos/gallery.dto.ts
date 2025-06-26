import { BaseDto } from "./base.dto";

export class GalleryDto extends BaseDto {
  label: string;
  url: string;
  key: string;
  created_at: Date;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(json: any) {
    super(json);
    this.label = json.label;
    this.url = json.url;
    this.key = json.key;
    this.created_at = json?.created_at ? new Date(json.created_at) : new Date();
  }
}
