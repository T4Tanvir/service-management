import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderDto } from "@/dtos/order.dto";
import { Edit, Eye } from "lucide-react";
import { Order } from "../../../../type/order.type";
import { StatusBadge } from "./StatusBadge";

interface OrderTableProps {
  orders: OrderDto[];
  onViewDetails: (order: OrderDto) => void;
  onEdit: (order: Order) => void;
}

export function OrderTable({ orders, onViewDetails, onEdit }: OrderTableProps) {
  const getTotallOrder = (orderId: number) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order || !order.orderItems) return 0;
    return order.orderItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotallPrice = (orderId: number) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order || !order.orderItems) return 0;
    return order.orderItems.reduce(
      (total, item) => total + item.total_price,
      0
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Order ID</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Phone Number</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Quantity</TableHead>
            <TableHead className="font-semibold">Price</TableHead>
            <TableHead className="font-semibold text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-muted-foreground"
              >
                No orders found
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="font-medium">{1000 + order.id}</TableCell>
                <TableCell>{order.user?.full_name}</TableCell>
                <TableCell>{order.user?.phone_number}</TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell>{getTotallOrder(order.id)}</TableCell>
                <TableCell className="font-medium">
                  {getTotallPrice(order.id).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(order)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      //onClick={() => onEdit(order)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
