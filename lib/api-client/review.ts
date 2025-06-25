import { ReviewDto } from "@/dtos/review.dto";
import axios from "axios";

const getreviewLink = async (userId: string) => {
  const response = await axios.get(`/api/users/${userId}`);
  return response.data;
};

const addReview = async (data: ReviewDto) => {
  const response = await axios.post(`/api/review`, data);

  return response.data;
};

const getAllReview = async () => {
  const response = await axios.get(`/api/review`);
  return response.data;
};

const deleteReview = async (reviewId: number) => {
  const response = await axios.delete(`/api/review/${reviewId}`);
  return response.data;
};
export { getreviewLink, addReview, getAllReview, deleteReview };
