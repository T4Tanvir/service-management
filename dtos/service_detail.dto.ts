import { BaseDto } from "./base.dto";

class ServiceDetailDto extends BaseDto {
  service_id: number | null;
  price: number;
  short_description: string;
  long_description: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(json: any) {
    super(json);

    this.service_id = this.parseNumber(json?.service_id, null);
    this.price = this.parseNumber(json?.price, 0);
    this.short_description = json?.short_description || "";
    this.long_description = json?.long_description || "";
  }
}

export { ServiceDetailDto };
