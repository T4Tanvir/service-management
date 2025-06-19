"use client";

import React from "react";
import {
  CartItem,
  NavigationPath,
  NestedService,
} from "../../type/service.type";
import { BreadcrumbNavigation } from "./BreadcrumbNavigation";
import { CartSection } from "./CartSelection";
import { ServiceCard } from "./ServiceCard";

interface ServiceSelectionProps {
  currentServices: NestedService[];
  cartItems: CartItem[];
  navigationPath: NavigationPath[];
  onAddToCart: (service: NestedService) => void;
  onRemoveFromCart: (serviceId: number) => void;
  onRemoveServiceFromCart: (serviceId: number) => void;
  onIncreaseQuantity: (serviceId: number) => void;
  onNavigateToSubcategory: (service: NestedService) => void;
  onNavigateBack: () => void;
  onNavigateToRoot: () => void;
  onNavigateToBreadcrumb: (index: number) => void;
  onConfirmOrder: () => void;
  getItemQuantity: (serviceId: number) => number;
  getTotalPrice?: () => number;
  isAdmin?: boolean;
  getTotalQuantity: () => number;
  countTotalServices: (services: NestedService[]) => number;
  handlePriceChange: (
    id: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  currentServices,
  cartItems,
  navigationPath,
  onAddToCart,
  onRemoveFromCart,
  onRemoveServiceFromCart,
  onIncreaseQuantity,
  onNavigateToSubcategory,
  onNavigateBack,
  onNavigateToRoot,
  onNavigateToBreadcrumb,
  onConfirmOrder,
  getItemQuantity,
  getTotalQuantity,
  countTotalServices,
  isAdmin,
  getTotalPrice,
  handlePriceChange,
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 h-[70vh]">
      {/* Service Section */}
      <div className="space-y-4 overflow-y-auto pr-2">
        <BreadcrumbNavigation
          navigationPath={navigationPath}
          onNavigateToRoot={onNavigateToRoot}
          onNavigateToBreadcrumb={onNavigateToBreadcrumb}
          onNavigateBack={onNavigateBack}
        />

        {/* Services List */}
        <div className="space-y-3">
          {currentServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              itemQuantity={getItemQuantity(service.id)}
              onAddToCart={onAddToCart}
              onRemoveFromCart={onRemoveFromCart}
              onIncreaseQuantity={onIncreaseQuantity}
              onNavigateToSubcategory={onNavigateToSubcategory}
              countTotalServices={countTotalServices}
            />
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <CartSection
        cartItems={cartItems}
        onRemoveFromCart={onRemoveFromCart}
        onRemoveServiceFromCart={onRemoveServiceFromCart}
        onIncreaseQuantity={onIncreaseQuantity}
        onConfirmOrder={onConfirmOrder}
        getTotalQuantity={getTotalQuantity}
        isAdmin={isAdmin}
        getTotalPrice={getTotalPrice}
        handlePriceChange={handlePriceChange}
      />
    </div>
  );
};
