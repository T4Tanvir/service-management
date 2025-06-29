"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useServiceBooking } from "../../hooks/useServiceBooking";
import { OrderConfirmation } from "./OrderConfirmation";
import { ServiceSelection } from "./ServiceSelection";
import { UserInfoForm } from "./UserInfoForm";
import { NestedService } from "@/type/service.type";

export default function ServiceBooking({
  nestedService,
}: {
  nestedService: NestedService[];
}) {
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
    resetBooking,
  } = useServiceBooking(nestedService);

  const handleModalClose = (open: boolean) => {
    setIsOpen(open);
    if (!open && currentStep === "confirmation") {
      resetBooking();
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleModalClose}>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-md font-medium text-lg transition-all duration-300 transform hover:scale-105">
            Book Service
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

          {currentStep === "confirmation" && <OrderConfirmation />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
