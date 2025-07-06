import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserDto } from "@/dtos/user.dto";
import { UserFormData } from "@/type/user.type";
import { Edit } from "lucide-react";
import { UserRoleBadge } from "./UserRoleBadge";
import { useState } from "react";
import UserInfoForm from "../component/UserForm";
import { toast } from "react-toastify";
import { editUser } from "@/lib/api-client/user";
import { ReviewLinkButton } from "./ReviewLinkButton";
import ChangePassword from "./ChangePasswordl";

interface OrderTableProps {
  users: UserDto[];
  isLoading: boolean;
  updateUserList: (data: UserDto) => void;
}

export function UserTable({ users, updateUserList }: OrderTableProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Partial<UserDto>>(users[0]);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async (data: UserFormData) => {
    setIsLoading(true);

    try {
      const response = await editUser(selectedUser.id!, new UserDto(data));
      toast.success(response.message);
      updateUserList(response.data);

      setShowModal(false);
      setIsLoading(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error adding user:", error);
      const errorMessage =
        error?.response?.data?.error || error?.message || "Failed to Edit user";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">#</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Role</TableHead>
            <TableHead className="font-semibold">Phone Number</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">City</TableHead>
            <TableHead className="font-semibold">Address</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-muted-foreground"
              >
                No Free Quote Found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.full_name}</TableCell>
                <TableCell>
                  <UserRoleBadge role={user.role} />
                </TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell>{user.address}</TableCell>

                <TableCell className="font-medium">
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowModal(true);
                      }}
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    <ChangePassword user={user} />
                    <ReviewLinkButton user={user} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {showModal && (
        <UserInfoForm
          title="Edit User"
          onSubmit={handleEdit}
          isLoading={isLoading}
          open={showModal}
          initialData={selectedUser}
          onOpenChange={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
