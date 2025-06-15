import { BaseDto } from "./base.dto";
import { ServiceDto } from "./service.dto";
// If you have a ServiceDto, import it here
// import { ServiceDto } from "./service.dto";

export class OrderItemDto extends BaseDto {
  id: number;
  order_id: number;
  service_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  service?: ServiceDto;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(json: any) {
    super(json);
    this.id = json.id;
    this.order_id = json.order_id;
    this.service_id = json.service_id;
    this.quantity = json.quantity;
    this.unit_price = json.unit_price;
    this.total_price = json?.total_price ?? 0;
    this.service = json.service ? new ServiceDto(json.service) : undefined;
  }
}
