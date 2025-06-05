import { FeatureDto } from "@/dtos/feature.dto";
import axios from "axios";

const addFeature = async (data: FeatureDto) => {
  const response = await axios.post("/api/feature", data);

  return response.data;
};

const getAllFeature = async () => {
  const response = await axios.get("/api/feature");

  return response.data;
};

const editFeature = async (data: FeatureDto) => {
    console.log(data, "data in editFeature");
  const response = await axios.put(`/api/feature/${data.id}`, data);
  return response.data;
};

const deleteFeature = async (id: number) => {
  const response = await axios.delete(`/api/feature/${id}`);
  return response.data;
};

export { addFeature, getAllFeature, editFeature, deleteFeature };
