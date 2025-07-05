import { Button } from "@/components/ui/button";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orderStatusNameValue } from "@/consttant/order";
import { OrderDto } from "@/dtos/order.dto";
import { Select } from "@radix-ui/react-select";
import { Eye } from "lucide-react";
import EditOrder from "./EditOrder";
import { StatusBadge } from "./StatusBadge";
import { NestedService } from "@/type/service.type";
import { useEffect, useState } from "react";
import { getServicesNestedInfo } from "@/lib/api-client/service";

interface OrderTableProps {
  orders: OrderDto[];
  onViewDetails: (order: OrderDto) => void;
  onUpdateOrder: (updatedOrder: OrderDto) => void;
  onStatusChange: (orderUuiD: string, updatedStatus: number) => void;
}

export function OrderTable({
  orders,
  onViewDetails,
  onStatusChange,
  onUpdateOrder,
}: OrderTableProps) {
  const [nestedServices, setNestedServices] = useState<NestedService[]>([]);

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

  useEffect(() => {
    const nestedEffect = async () => {
      const services = await getServicesNestedInfo();
      setNestedServices(services);
    };
    nestedEffect();
  }, []);

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
            <TableHead className="font-semibold">Date</TableHead>
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
                <TableCell className="font-medium">
                  {order.created_at
                    ? new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                    : "N/A"}
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
                    {nestedServices.length && (
                      <EditOrder
                        order={order}
                        onUpdateOrder={onUpdateOrder}
                        nestedServices={nestedServices}
                      />
                    )}
                    <Select
                      value={String(orderStatusNameValue[order.status])}
                      onValueChange={(value: string) =>
                        onStatusChange(order.uuid, Number(value))
                      }
                    >
                      <SelectTrigger className="w-32 h-8" aria-label="Status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(orderStatusNameValue).map((status) => (
                          <SelectItem
                            key={status}
                            value={String(orderStatusNameValue[status])}
                          >
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
