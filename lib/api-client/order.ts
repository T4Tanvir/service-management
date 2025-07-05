import { OrderDto } from "@/dtos/order.dto";
import { DateRange } from "@/type/order.type";
import axios from "axios";

const addOrder = async (data: OrderDto) => {
  const response = await axios.post("/api/order", data);

  return response.data;
};

const getAllOrders = async (date: DateRange) => {
  const from = date?.from?.toISOString().split("T")[0];
  const to = date?.to?.toISOString().split("T")[0];

  const response = await axios.get(`/api/order?from=${from}&to=${to}`);
  return response.data;
};

const editOrder = async (data: OrderDto) => {
  const response = await axios.put(`/api/order/${data.uuid}?type=order`, data);
  return response.data;
};

const editOrderStatus = async (uuid: string, status: number) => {
  const response = await axios.put(`/api/order/${uuid}?type=status`, {
    status,
  });
  return response.data;
};

export { addOrder, editOrder, editOrderStatus, getAllOrders };
