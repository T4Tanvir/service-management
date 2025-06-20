import { BaseDto } from "./base.dto";
import { UserDto } from "./user.dto";

class FreeQuoteDto extends BaseDto {
  user_id: number;
  user: UserDto | undefined;
  task_description: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(json: any) {
    super(json);

    this.user_id = this.parseNumber(json?.service_id, 0);
    this.task_description = json?.task_description || "";
    this.user = json.user ? new UserDto(json.user) : undefined;
  }
}

export { FreeQuoteDto };
