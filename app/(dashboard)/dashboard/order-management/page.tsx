"use client";

import { Card, CardContent } from "@/components/ui/card";
import { OrderDto } from "@/dtos/order.dto";
import { useOrderFilter } from "@/hooks/useOrderFilter";
import { editOrderStatus, getAllOrders } from "@/lib/api-client/order";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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

  const handleStatusChange = async (
    orderUuid: string,
    updatedStatus: number
  ) => {
    try {
      const response = await editOrderStatus(orderUuid, updatedStatus);
      toast.success("Order status updated successfully");
      const updatedOrder = response.data as OrderDto;
      updateOrderList(updatedOrder);
    } catch (err) {
      toast.error("Failed to update order status");
      console.error(err);
    }
  };

  const handleCloseInvoiceModal = () => {
    setIsInvoiceModalOpen(false);
    setSelectedOrder(null);
  };

  const updateOrderList = async (updatedOrder: OrderDto) => {
    const updatedOrders = orders.map((order) =>
      order.uuid === updatedOrder.uuid ? updatedOrder : order
    );

    setOrders(updatedOrders);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getAllOrders();
      setOrders(response.data || []);
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <OrderManagementHeader />

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
            onStatusChange={handleStatusChange}
            onUpdateOrder={updateOrderList}
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
