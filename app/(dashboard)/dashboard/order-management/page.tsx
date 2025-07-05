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

export type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

export default function OrderManagementTable() {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderDto | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>(undefined);

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
      if (!date) return;
      const response = await getAllOrders(date);
      setOrders(response.data || []);
    };
    if (date) fetchOrders();
  }, [date]);

  useEffect(() => {
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const from = new Date(year, month, 1);
    const to = new Date(year, month, 31);

    setDate({ from, to });
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <OrderManagementHeader date={date} setDate={setDate} />

        <CardContent>
          <OrderTable
            orders={orders}
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
