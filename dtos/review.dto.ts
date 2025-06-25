import { BaseDto } from "./base.dto";
import { ServiceDto } from "./service.dto";
import { UserDto } from "./user.dto";

class ReviewDto extends BaseDto {
  id: number;
  uuid: string;
  review_permit_uuid: string;
  phone_number: string;
  service_id: number | null;
  comment: string | null;
  rating: number | null;
  created_at: Date;
  user: UserDto | null;
  service: ServiceDto | null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(json: any) {
    super(json);

    this.id = this.parseNumber(json?.id, 0);
    this.uuid = json?.uuid || "";
    this.phone_number = json?.phone_number || "";
    this.review_permit_uuid = json?.review_permit_uuid || "";
    this.service_id = json?.service_id
      ? this.parseNumber(json.service_id, null)
      : null;
    this.comment = json?.comment || null;
    this.rating = json?.rating ? this.parseNumber(json.rating, null) : null;
    this.created_at = json?.created_at ? new Date(json.created_at) : new Date();
    this.user = json.user ? new UserDto(json.user) : null;
    this.service = json.service ? new ServiceDto(json.service) : null;
  }
}

export { ReviewDto };
