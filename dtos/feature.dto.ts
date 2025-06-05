import { BaseDto } from "./base.dto";

class FeatureDto extends BaseDto {
  service_id: number;
  feature_text: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(json: any) {
    super(json);

    this.service_id = this.parseNumber(json?.service_id, 0);

    this.feature_text = json?.feature_text || "";
  }
}

export { FeatureDto };
