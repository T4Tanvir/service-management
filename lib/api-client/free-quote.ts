import { FreeQuoteDto } from "@/dtos/freeQuote.dto";
import axios from "axios";

const addFreeQuote = async (data: FreeQuoteDto) => {
  const response = await axios.post("/api/free-quote", data);

  return response.data;
};

export { addFreeQuote };
