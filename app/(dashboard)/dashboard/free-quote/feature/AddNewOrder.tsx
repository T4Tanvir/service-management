"use client";

import { ServiceSelection } from "@/components/service-booking/ServiceSelection";
import { UserInfoForm } from "@/components/service-booking/UserInfoForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserDto } from "@/dtos/user.dto";
import { useServiceBookingStore } from "@/store/serviceBookingStore";
import { NestedService } from "@/type/service.type";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface AddNewOrderProps {
  userDetail: UserDto;
  nestedServices: NestedService[];
}

export default function AddNewOrder({
  userDetail,
  nestedServices,
}: AddNewOrderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    cartItems,
    currentServices,
    navigationPath,
    currentStep,
    userInfo,
    isSubmitting,
    addToCart,
    removeFromCart,
    removeServiceFromCart,
    increaseQuantity,
    getTotalQuantity,
    getItemQuantity,
    navigateToSubcategory,
    navigateBack,
    navigateToRoot,
    navigateToBreadcrumb,
    countTotalServices,
    handleUserInfoChange,
    handleOrderConfirm,
    handleBackToServices,
    handleSubmitOrder,
    handleDefaultvalue,
    handlePriceChange,
    getTotalPrice,
    resetBooking,
    initializeServices,
  } = useServiceBookingStore();

  // Initialize services on mount
  useEffect(() => {
    initializeServices(nestedServices);
  }, [nestedServices, initializeServices]);

  const handleModalClose = (open: boolean) => {
    setIsOpen(open);
    if (!open && currentStep === "confirmation") {
      resetBooking();
    }
  };

  useEffect(() => {
    if (isOpen) handleDefaultvalue([], userDetail);
  }, [isOpen, handleDefaultvalue, userDetail]);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleModalClose}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus className="h-3 w-3" />
            Add Order
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              {currentStep === "services" && "Select Service"}
              {currentStep === "user-info" && "Enter Personal Information"}
              {currentStep === "confirmation" && "Order Confirmation"}
            </DialogTitle>
          </DialogHeader>

          {currentStep === "services" && (
            <ServiceSelection
              currentServices={currentServices}
              cartItems={cartItems}
              navigationPath={navigationPath}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              onRemoveServiceFromCart={removeServiceFromCart}
              onIncreaseQuantity={increaseQuantity}
              onNavigateToSubcategory={navigateToSubcategory}
              onNavigateBack={navigateBack}
              onNavigateToRoot={navigateToRoot}
              onNavigateToBreadcrumb={navigateToBreadcrumb}
              onConfirmOrder={handleOrderConfirm}
              getItemQuantity={getItemQuantity}
              getTotalQuantity={getTotalQuantity}
              countTotalServices={countTotalServices}
              isAdmin={true}
              handlePriceChange={handlePriceChange}
              getTotalPrice={getTotalPrice}
            />
          )}

          {currentStep === "user-info" && (
            <UserInfoForm
              userInfo={userInfo}
              cartItems={cartItems}
              isSubmitting={isSubmitting}
              onUserInfoChange={handleUserInfoChange}
              onBackToServices={handleBackToServices}
              onSubmitOrder={handleSubmitOrder}
              getTotalQuantity={getTotalQuantity}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
