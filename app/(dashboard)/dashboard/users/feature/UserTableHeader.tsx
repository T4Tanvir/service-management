import { CardHeader, CardTitle } from "@/components/ui/card";
import { UserFormData } from "@/type/user.type";
import UserInfoForm from "../component/UserForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface UserTableHeaderProps {
  handleSubmit: (data: UserFormData) => void;
  isLoading: boolean;
}

export function UserTableHeader({
  handleSubmit,
  isLoading,
}: UserTableHeaderProps) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-2xl font-bold">User Management</CardTitle>
          <Button
            className="flex items-center gap-2"
            onClick={() => setShowModal(true)}
          >
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </CardHeader>
      {showModal && (
        <UserInfoForm
          title="Add User"
          onSubmit={handleSubmit}
          isLoading={isLoading}
          open={showModal}
          onOpenChange={() => setShowModal(false)}
        />
      )}
    </>
  );
}
