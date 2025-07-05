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

/**
 * Uploads an image to S3 and returns its public URL.
 * @param data - The S3 configuration data transfer object.
 * @param file - The image file to upload.
 * @returns A promise that resolves to the public URL of the uploaded image.
 * @throws Error if the upload fails or the response is invalid.
 */
const uploadImageAndGetUrl = async (
  data: S3Dto,
  file: File
): Promise<string> => {
  try {
    // Get pre-signed URLs from the server
    const response = await getObjectUrl(data);

    // Validate response data
    if (!response?.data?.publicUrl || !response?.data?.putUrl) {
      throw new Error("Invalid response: Missing publicUrl or putUrl");
    }

    const { publicUrl, putUrl } = response.data;

    // Upload the image to S3
    await uploadImageToS3(putUrl, file);

    return publicUrl;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    } else {
      throw new Error("Failed to upload image: An unknown error occurred");
    }
  }
};
export { getObjectUrl, uploadImageToS3, uploadImageAndGetUrl };
