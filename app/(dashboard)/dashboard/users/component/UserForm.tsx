"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { selangorCities } from "@/consttant/selangorCities";
import { userStatusNameValuePair } from "@/consttant/userStatus";
import { UserFormData } from "@/type/user.type";
import { Dialog } from "@radix-ui/react-dialog";
import { Loader } from "lucide-react";
import { useState } from "react";

interface UserInfoFormProps {
  onSubmit?: (data: UserFormData) => void;
  initialData?: Partial<UserFormData>;
  isLoading: boolean;
  title?: string;
  open: boolean;
  onOpenChange: () => void;
}

function UserInfoForm({
  onSubmit,
  initialData,
  isLoading,
  title,
  open,
  onOpenChange,
}: UserInfoFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    full_name: initialData?.full_name || "",
    phone_number: initialData?.phone_number || "",
    email: initialData?.email || "",
    city: initialData?.city || "",
    address: initialData?.address || "",
    role: initialData?.role
      ? String(userStatusNameValuePair[initialData.role])
      : "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title || "Add user"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => handleInputChange("full_name", e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              type="tel"
              value={formData.phone_number}
              onChange={(e) =>
                handleInputChange("phone_number", e.target.value)
              }
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Select
              value={formData.city}
              onValueChange={(value) => handleInputChange("city", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent>
                {selangorCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleInputChange("role", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select user role" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(userStatusNameValuePair).map((role) => (
                  <SelectItem
                    key={role}
                    value={String(userStatusNameValuePair[role])}
                  >
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Enter your full address"
              className="min-h-[80px]"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="submit" className="w-full sm:w-auto">
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UserInfoForm;
