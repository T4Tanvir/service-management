import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye } from "lucide-react";
import { Order } from "../../../../type/order.type";

type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

interface StatusBadgeProps {
  status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig: Record<
    OrderStatus,
    { label: string; variant: "secondary" | "default" | "destructive" }
  > = {
    pending: { label: "Pending", variant: "secondary" },
    processing: { label: "Processing", variant: "default" },
    completed: { label: "Completed", variant: "default" },
    cancelled: { label: "Cancelled", variant: "destructive" },
  };

  const config = statusConfig[status];
  return (
    <Badge
      variant={config.variant}
      className={
        status === "completed"
          ? "bg-green-100 text-green-800 hover:bg-green-200"
          : ""
      }
    >
      {config.label}
    </Badge>
  );
}

interface OrderTableProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
  onEdit: (order: Order) => void;
}

export function OrderTable({ orders, onViewDetails, onEdit }: OrderTableProps) {
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
            orders.map((order) => (
              <TableRow key={order.order_id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{order.order_id}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell>{order.qty}</TableCell>
                <TableCell className="font-medium">
                  ৳{order.price.toLocaleString()}
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
                      onClick={() => onEdit(order)}
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
