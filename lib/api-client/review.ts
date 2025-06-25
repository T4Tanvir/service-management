import axios from "axios";

const getreviewLink = async (userId: string) => {
  const response = await axios.get(`/api/users/${userId}`);
  return response.data;
};

export { getreviewLink };
