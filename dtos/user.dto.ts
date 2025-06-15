import { UserRole } from "@/enums/user_role";
import { BaseDto } from "./base.dto";

export class UserDto extends BaseDto {
  id: number;
  full_name: string;
  phone_number: string;
  address: string;
  role: UserRole;
  additional_info?: string;
  created_at: Date;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(json: any) {
    super(json);
    this.id = json.id;
    this.full_name = json.full_name;
    this.phone_number = json.phone_number;
    this.address = json.address;
    this.role = json?.role ?? UserRole.CLIENT;
    this.additional_info = json.additional_info;
    this.created_at = new Date(json.created_at);
  }
}
