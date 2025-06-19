"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { CartItem, UserInfo } from "../../type/service.type";

interface UserInfoFormProps {
  userInfo: UserInfo;
  cartItems: CartItem[];
  isSubmitting: boolean;
  onUserInfoChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBackToServices: () => void;
  onSubmitOrder: (e: React.FormEvent) => void;
  isAdmin?: boolean;
  getTotalPrice?: () => number;
  getTotalQuantity: () => number;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({
  userInfo,
  cartItems,
  isSubmitting,
  onUserInfoChange,
  onBackToServices,
  onSubmitOrder,
  getTotalQuantity,
  isAdmin,
  getTotalPrice,
}) => {
  return (
    <div className="h-[70vh] overflow-y-auto">
      <div className="flex items-center gap-2 mb-6">
        <Button
          size="sm"
          variant="ghost"
          onClick={onBackToServices}
          className="p-1"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Go Back
        </Button>
        <h3 className="text-lg font-semibold">Personal Information</h3>
      </div>

      <form onSubmit={onSubmitOrder} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={userInfo.name}
                onChange={onUserInfoChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                value={userInfo.phone}
                onChange={onUserInfoChange}
                placeholder="01XXXXXXXXX"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userInfo.email}
                onChange={onUserInfoChange}
                placeholder="example@mail.com"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                name="address"
                value={userInfo.address}
                onChange={onUserInfoChange}
                placeholder="Your current address"
                required
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Information</Label>
              <Textarea
                id="notes"
                name="notes"
                value={userInfo.notes}
                onChange={onUserInfoChange}
                placeholder="Any additional information or instructions"
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Order Summary</h4>
          <div className="space-y-2 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span>{item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total Item</span>
              <span>{getTotalQuantity()}</span>
            </div>
            {isAdmin && (
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total Price</span>
                <span>{getTotalPrice!()}</span>
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Submit Order"}
          </Button>
        </div>
      </form>
    </div>
  );
};
