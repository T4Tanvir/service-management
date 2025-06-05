import { FaqDto } from "@/dtos/faq.dto";
import axios from "axios";

const addFaq = async (data: FaqDto) => {
  const response = await axios.post("/api/faq", data);

  return response.data;
};

const getAllFaq = async () => {
  const response = await axios.get("/api/faq");

  return response.data;
};

const editFaq = async (data: FaqDto) => {
    console.log(data, "data in editFaq");
  const response = await axios.put(`/api/faq/${data.id}`, data);
  return response.data;
};

const deleteFaq = async (id: number) => {
  const response = await axios.delete(`/api/faq/${id}`);
  return response.data;
};

export { addFaq, getAllFaq, editFaq, deleteFaq };
