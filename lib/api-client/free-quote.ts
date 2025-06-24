import { FreeQuoteDto } from "@/dtos/freeQuote.dto";
import axios from "axios";

const addFreeQuote = async (data: FreeQuoteDto) => {
  const response = await axios.post("/api/free-quote", data);

  return response.data;
};

const getAllFreeQuote = async () => {
  const response = await axios.get("/api/free-quote");
  return response.data;
};

const editFreeQuoteStatus = async (id: number, status: number) => {
  const response = await axios.put(`/api/free-quote/${id}`, {
    status,
  });
  return response.data;
};

export { addFreeQuote, getAllFreeQuote, editFreeQuoteStatus };
