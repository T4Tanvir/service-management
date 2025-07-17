"use client";

import { Card, CardContent } from "@/components/ui/card";
import { UserDto } from "@/dtos/user.dto";
import { addUser, getAllUser } from "@/lib/api-client/user";
import { UserFormData } from "@/type/user.type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserTable } from "./feature/UserTable";
import { UserTableHeader } from "./feature/UserTableHeader";

export default function User() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateUserList = (data: UserDto) => {
    const updateduser = users.map((user) =>
      user.id === data.id ? data : user
    );
    setUsers(updateduser);
  };

  const handleSubmit = async (data: UserFormData) => {
    setIsLoading(true);

    try {
      const response = await addUser(new UserDto(data));
      toast.success(response.data.message);
      setUsers([response.data, ...users]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error adding user:", error);
      const errorMessage =
        error?.response?.data?.error || error?.message || "Failed to add user";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getAllUser();
      console.log(response.data);
      setUsers(response.data || []);
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto space-y-6">
      <Card>
        <UserTableHeader handleSubmit={handleSubmit} isLoading={isLoading} />

        <CardContent>
          <UserTable
            users={users}
            updateUserList={updateUserList}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
