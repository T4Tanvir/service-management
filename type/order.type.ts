export interface Order {
  order_id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  qty: number;
  price: number;
  product_name: string;
  unit_price: number;
  tax?: number;
  discount?: number;
  order_date: string;
  due_date?: string;
}