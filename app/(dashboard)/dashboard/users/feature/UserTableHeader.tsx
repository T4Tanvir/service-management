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
        <div className="flex flex-col w-full gap-4 lg:flex-row lg:justify-between lg:items-center">
          <CardTitle className="text-xl font-bold md:text-2xl lg:text-3xl">
            User Management
          </CardTitle>
          <Button
            className="flex items-center gap-2 w-full sm:w-auto"
            onClick={() => setShowModal(true)}
          >
            <Plus className="h-4 w-4" />
            <span className="hidden xs:inline">Add User</span>
            <span className="inline xs:hidden">Add</span>
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
