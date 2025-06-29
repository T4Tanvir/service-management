import { BaseDto } from "./base.dto";

class FaqDto extends BaseDto {
  service_id: number | null;
  question: string;
  answer: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(json: any) {
    super(json);

    this.service_id = this.parseNumber(json?.service_id, null);

    this.question = json?.question || "";
    this.answer = json?.answer || "";
  }
}

export { FaqDto };
