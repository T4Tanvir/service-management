import { GalleryDto } from "@/dtos/gallery.dto";
import axios from "axios";

const addImage = async (data: GalleryDto) => {
  const response = await axios.post(`/api/gallery`, data);

  return response.data;
};

const getAllImages = async () => {
  const response = await axios.get(`/api/gallery`);
  return response.data;
};

export { addImage, getAllImages };
