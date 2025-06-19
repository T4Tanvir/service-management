// components/CartSection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import React from "react";
import { CartItem } from "../../type/service.type";

interface CartSectionProps {
  cartItems: CartItem[];
  onRemoveFromCart: (serviceId: number) => void;
  onRemoveServiceFromCart: (serviceId: number) => void;
  onIncreaseQuantity: (serviceId: number) => void;
  onConfirmOrder: () => void;
  getTotalQuantity: () => number;
  getTotalPrice?: () => number;
  isAdmin?: boolean;
  handlePriceChange?: (
    id: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const CartSection: React.FC<CartSectionProps> = ({
  cartItems,
  onRemoveFromCart,
  onRemoveServiceFromCart,
  onIncreaseQuantity,
  onConfirmOrder,
  getTotalQuantity,
  getTotalPrice,
  handlePriceChange,
  isAdmin,
}) => {
  return (
    <div className="border-l pl-6 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="h-5 w-5" />
        <h3 className="text-lg font-semibold text-gray-800">
          Cart ({cartItems.length})
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>Cart is empty</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <Card key={item.id} className="p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{item.fullPath}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onRemoveServiceFromCart(item.id)}
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                >
                  ×
                </Button>
              </div>

              {isAdmin && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">Unit Price</div>
                  <input
                    type="number"
                    onChange={(e) => handlePriceChange!(item.id, e)}
                    defaultValue={item.price}
                    className="text-sm font-medium bg-transparent border border-gray-100 rounded px-1 py-0.5 outline-none text-right w-20 focus:border-gray-300 hover:border-gray-200"
                    min="1"
                  />
                </div>
              )}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onRemoveFromCart(item.id)}
                    className="h-6 w-6 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onIncreaseQuantity(item.id)}
                    className="h-6 w-6 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <span className="text-sm font-medium">{item.quantity}</span>
              </div>
            </Card>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total Item:</span>
            <span className="font-bold text-lg">{getTotalQuantity()}</span>
          </div>

          {isAdmin && (
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total Price:</span>
              <span className="font-bold text-lg">{getTotalPrice!()}</span>
            </div>
          )}

          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={onConfirmOrder}
          >
            Confirm Order
          </Button>
        </div>
      )}
    </div>
  );
};
