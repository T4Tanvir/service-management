import { S3Dto } from "@/dtos/s3.dto";
import axios from "axios";

const getObjectUrl = async (data: S3Dto) => {
  const response = await axios.post("/api/s3", data);
  return response.data;
};

const uploadImageToS3 = async (url: string, file: File) => {
  await axios.put(url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
};

export { getObjectUrl, uploadImageToS3 };
