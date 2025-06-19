import { OrderDto } from "@/dtos/order.dto";
import axios from "axios";

const addOrder = async (data: OrderDto) => {
  const response = await axios.post("/api/order", data);

  return response.data;
};

const getAllOrders = async () => {
  const response = await axios.get("/api/order");
  return response.data;
};

const editOrder = async (data: OrderDto) => {
  console.log(data, "data in  editOrder");
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

