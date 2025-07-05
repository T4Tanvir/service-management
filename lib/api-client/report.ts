import axios from "axios";
import { DateRange } from "@/type/order.type";

const getReport = async (dateRange: DateRange) => {
  const response = await axios.get(
    `/api/report?startDate=${dateRange.from}&endDate=${dateRange.to}`
  );
  return response.data;
};

export { getReport };
