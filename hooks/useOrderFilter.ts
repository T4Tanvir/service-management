import { OrderDto } from "@/dtos/order.dto";
import { useMemo } from "react";

export function useOrderFilter(orders: OrderDto[], searchTerm: string) {
  return useMemo(() => {
    if (!searchTerm) return orders;

    const lowercaseSearch = searchTerm.toLowerCase();
    return orders.filter(
      (order) =>
        order.user?.full_name.toLowerCase().includes(lowercaseSearch) ||
        //order.id.(lowercaseSearch) ||
        order.user?.phone_number.includes(searchTerm)
    );
  }, [orders, searchTerm]);
}
