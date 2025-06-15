"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useOrderFilter } from "@/hooks/useOrderFilter";
import { Order } from "@/type/order.type";
import { useState } from "react";
import { OrderManagementHeader } from "./feature/OrderManagementHeader";
import { SearchInput } from "./feature/SearchInput";
import { OrderTable } from "./feature/OrderTable";
import { InvoiceModal } from "./feature/InvoiceModal";
import { sampleOrders } from "@/consttant/sampleOrders";

export default function OrderManagementTable() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const filteredOrders = useOrderFilter(orders, searchTerm);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsInvoiceModalOpen(true);
  };

  const handleEdit = (order: Order) => {
    console.log("Edit order:", order);
    // Edit functionality would be implemented here
  };

  const handleNewOrder = () => {
    console.log("Create new order");
    // New order functionality would be implemented here
  };

  const handleCloseInvoiceModal = () => {
    setIsInvoiceModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <OrderManagementHeader onNewOrder={handleNewOrder} />

        <CardContent>
          <div className="mb-4">
            <SearchInput
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search by name, order ID, or phone..."
            />
          </div>

          <OrderTable
            orders={filteredOrders}
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
          />
        </CardContent>
      </Card>

      <InvoiceModal
        order={selectedOrder}
        isOpen={isInvoiceModalOpen}
        onClose={handleCloseInvoiceModal}
      />
    </div>
  );
}
