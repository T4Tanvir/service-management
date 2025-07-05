import { BaseDto } from "./base.dto";
import { ServiceDto } from "./service.dto";

class FaqDto extends BaseDto {
  service_id: number | null;
  question: string;
  answer: string;
  service: ServiceDto | null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(json: any) {
    super(json);

    this.service_id = this.parseNumber(json?.service_id, null);

    this.question = json?.question || "";
    this.answer = json?.answer || "";
    this.service = json?.service;
  }
}

export { FaqDto };
