"use client";

import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface OrderManagementHeaderProps {
  onNewOrder: () => void;
}

export function OrderManagementHeader({ onNewOrder }: OrderManagementHeaderProps) {
  return (
    <CardHeader>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <CardTitle className="text-2xl font-bold">Order Management</CardTitle>
        <Button onClick={onNewOrder} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Order
        </Button>
      </div>
    </CardHeader>
  );
}