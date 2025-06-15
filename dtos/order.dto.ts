import { OrderStatus } from "@/generated/prisma";
import { BaseDto } from "./base.dto";
import { OrderItemDto } from "./order_item.dto";
import { UserDto } from "./user.dto";

export class OrderDto extends BaseDto {
  id: number;
  uuid: string;
  status: OrderStatus; // Or use an enum if you have OrderStatus defined
  user_id: number;

  user?: UserDto;
  orderItems?: OrderItemDto[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(json: any) {
    super(json);
    this.id = json.id;
    this.uuid = json.uuid;
    this.status = json?.status ?? OrderStatus.REQUESTED;
    this.user_id = json.user_id;
    this.user = json.user ? new UserDto(json.user) : undefined;
    this.orderItems = json.orderItems
      ? json.orderItems.map((item: unknown) => new OrderItemDto(item))
      : undefined;
  }
}
