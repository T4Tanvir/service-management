"use client";

import { Card, CardContent } from "@/components/ui/card";
import { OrderDto } from "@/dtos/order.dto";
import { useOrderFilter } from "@/hooks/useOrderFilter";
import { getAllOrders } from "@/lib/api-client/order";
import { Order } from "@/type/order.type";
import { useEffect, useState } from "react";
import { InvoiceModal } from "./feature/InvoiceModal";
import { OrderManagementHeader } from "./feature/OrderManagementHeader";
import { OrderTable } from "./feature/OrderTable";
import { SearchInput } from "./feature/SearchInput";

export default function OrderManagementTable() {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderDto | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const filteredOrders = useOrderFilter(orders, searchTerm);

  const handleViewDetails = (order: OrderDto) => {
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

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getAllOrders();
      console.log(response);
      setOrders(response.data || []);
    };
    fetchOrders();
  }, []);

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
