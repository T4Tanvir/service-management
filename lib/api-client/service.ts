import { ServiceDto } from "@/dtos/service.dto";
import axios from "axios";

const addService = async (data: ServiceDto) => {
  return axios
    .post("/api/services", data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error adding service:", error);
      throw error;
    });
};

const getAllServiceDetails = async () => {
  const response = await axios.get("/api/services?type=all");

  return response.data.map((service: ServiceDto) => new ServiceDto(service));
};

const getAllServiceBasicInfo = async () => {
  const response = await axios.get("/api/services?type=basic");

  return response.data.map((service: ServiceDto) => new ServiceDto(service));
};

const getServicesNestedInfo = async () => {
  const response = await axios.get("/api/services?type=nested");

  return response.data;
};

const getParentServicesBasicInfo = async () => {
  const response = await axios.get("/api/services?type=basic&parentId=0");

  return response.data.map((service: ServiceDto) => new ServiceDto(service));
};

const editService = async (data: ServiceDto) => {
  const response = await axios.put(`/api/services/${data.id}`, data);

  return response.data;
};

const deleteService = async (id: number) => {
  const response = await axios.delete(`/api/services/${id}`);

  return response.data;
};

export {
  addService,
  deleteService,
  editService,
  getAllServiceBasicInfo,
  getAllServiceDetails,
  getServicesNestedInfo,
  getParentServicesBasicInfo,
};
