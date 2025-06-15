import { OrderDto } from "@/dtos/order.dto";
import axios from "axios";

const addOrder = async (data: OrderDto) => {
  const response = await axios.post("/api/order", data);

  return response.data;
};

export { addOrder };
