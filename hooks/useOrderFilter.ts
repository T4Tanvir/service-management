import { useMemo } from "react";
import { Order } from "../type/order.type";

export function useOrderFilter(orders: Order[], searchTerm: string) {
  return useMemo(() => {
    if (!searchTerm) return orders;
    
    const lowercaseSearch = searchTerm.toLowerCase();
    return orders.filter(
      (order) =>
        order.name.toLowerCase().includes(lowercaseSearch) ||
        order.order_id.toLowerCase().includes(lowercaseSearch) ||
        order.phone.includes(searchTerm)
    );
  }, [orders, searchTerm]);
}