import { BaseDto } from "./base.dto";
import { FaqDto } from "./faq.dto";
import { ServiceDetailDto } from "./service_detail.dto";

class ServiceDto extends BaseDto {
  name: string;
  parent_id: number | null;
  short_description: string;
  image_url: string;
  faqs: FaqDto[];
  details: ServiceDetailDto | null;
  active: boolean;
  created_at: Date;
  updated_at: Date;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(json: any) {
    super(json);
    this.name = json.name || "";
    this.short_description = json.short_description || "";
    this.image_url = json.image_url || "";
    this.parent_id = this.parseNumber(json?.parent_id, null);
    this.faqs = json?.faqs
      ? json.faqs.map((faq: Partial<FaqDto>) => new FaqDto(faq))
      : [];
    this.details = json.details ? new ServiceDetailDto(json.details) : null;
    this.active = json?.active;

    this.created_at = json?.created_at ? json.created_at : new Date();
    this.updated_at = json?.updated_at;
  }

  isValid(): boolean {
    return (
      (this.name.length > 4 && this.name.length < 100) ||
      this.short_description.length < 50
    );
  }
}

export { ServiceDto };
