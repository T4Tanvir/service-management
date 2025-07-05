"use client";

import { OrderConfirmation } from "@/components/service-booking/OrderConfirmation";
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
import { OrderDto } from "@/dtos/order.dto";
import { OrderItemDto } from "@/dtos/order_item.dto";
import { useServiceBooking } from "@/hooks/useServiceBooking";
import { editOrder } from "@/lib/api-client/order";
import { NestedService } from "@/type/service.type";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function EditOrder({
  order,
  onUpdateOrder,
  nestedServices,
}: {
  order: OrderDto;
  onUpdateOrder: (updatedOrder: OrderDto) => void;
  nestedServices: NestedService[];
}) {
  const {
    cartItems,
    currentServices,
    navigationPath,
    currentStep,
    userInfo,
    getTotalPrice,
    handleDefaultvalue,
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
    resetBooking,
    handlePriceChange,
  } = useServiceBooking(nestedServices);

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleModalClose = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      handleDefaultvalue(order.orderItems || [], order.user!);
    }
    if (!open && currentStep === "confirmation") {
      resetBooking();
    }
  };

  const onSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    handleEdit(e, order);
  };
  const handleEdit = async (e: React.FormEvent, order: OrderDto) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = new OrderDto({
      uuid: order.uuid,
      user: {
        full_name: userInfo.name,
        phone_number: userInfo.phone,
        email: userInfo.email,
        address: userInfo.address,
        additional_info: userInfo.notes,
      },
      orderItems: cartItems.map(
        (item) =>
          new OrderItemDto({
            service_id: item.id,
            quantity: item.quantity,
            unit_price: item.price,
          })
      ),
    });

    const response = await editOrder(orderData);

    onUpdateOrder(response.data);
    toast.success("Order updated successfully!");
    setIsSubmitting(false);

    resetBooking();
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleModalClose}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Edit className="h-3 w-3" />
            Edit
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
              getTotalPrice={getTotalPrice}
              isAdmin={true} // Assuming this is for admin view
              handlePriceChange={handlePriceChange}
            />
          )}

          {currentStep === "user-info" && (
            <UserInfoForm
              userInfo={userInfo}
              cartItems={cartItems}
              isSubmitting={isSubmitting}
              onUserInfoChange={handleUserInfoChange}
              onBackToServices={handleBackToServices}
              onSubmitOrder={onSubmitOrder}
              getTotalQuantity={getTotalQuantity}
              isAdmin={true} // Assuming this is for admin view
              getTotalPrice={getTotalPrice}
            />
          )}

          {currentStep === "confirmation" && <OrderConfirmation />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
