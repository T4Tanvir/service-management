import { UserDto } from "@/dtos/user.dto";
import axios from "axios";

const addUser = async (data: UserDto) => {
  const response = await axios.post("/api/users", data);

  return response.data;
};

const getAllUser = async () => {
  const response = await axios.get("/api/users");
  return response.data;
};

const editUser = async (id: number, data: UserDto) => {
  const response = await axios.put(`/api/users/${id}`, data);
  return response.data;
};

export { addUser, editUser, getAllUser };
