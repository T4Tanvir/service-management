interface NestedService {
  id: number;
  name: string;
  parent_id: number | null;
  description: string | null;
  subcategory: NestedService[];
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  fullPath: string;
}

interface NavigationPath {
  id: number;
  name: string;
}

interface UserInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
}

export type OrderStep = "services" | "user-info" | "confirmation";

export type { CartItem, NavigationPath, NestedService, UserInfo };
