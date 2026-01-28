import { OrderDto } from "@/dtos/order.dto";
import { OrderItemDto } from "@/dtos/order_item.dto";
import { UserDto } from "@/dtos/user.dto";
import { addOrder } from "@/lib/api-client/order";
import { getServicesNestedInfo } from "@/lib/api-client/service";
import {
  CartItem,
  NavigationPath,
  NestedService,
  OrderStep,
  UserInfo,
} from "@/type/service.type";
import { create } from "zustand";
import { toast } from "react-toastify";

interface ServiceBookingState {
  // State
  cartItems: CartItem[];
  currentServices: NestedService[];
  navigationPath: NavigationPath[];
  currentStep: OrderStep;
  userInfo: UserInfo;
  isSubmitting: boolean;
  isLoading: boolean;
  nestedServices: NestedService[];

  // Cart actions
  addToCart: (service: NestedService) => void;
  removeFromCart: (serviceId: number) => void;
  removeServiceFromCart: (serviceId: number) => void;
  increaseQuantity: (serviceId: number) => void;
  handlePriceChange: (
    serviceId: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  // Navigation actions
  navigateToSubcategory: (service: NestedService) => void;
  navigateBack: () => void;
  navigateToRoot: () => void;
  navigateToBreadcrumb: (index: number) => void;

  // Order actions
  handleOrderConfirm: () => void;
  handleBackToServices: () => void;
  handleSubmitOrder: (e: React.FormEvent) => Promise<void>;
  handleUserInfoChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleDefaultvalue: (cartItems: OrderItemDto[], userInfo: UserDto) => Promise<void>;

  // Utility functions
  getTotalPrice: () => number;
  getTotalQuantity: () => number;
  getItemQuantity: (serviceId: number) => number;
  countTotalServices: (services: NestedService[]) => number;
  resetBooking: () => void;

  // Initialize
  initializeServices: (nestedServicesS?: NestedService[]) => Promise<void>;
}

// Helper functions
const findCartItem = (cartItems: CartItem[], serviceId: number) =>
  cartItems.find((item) => item.id === serviceId);

const findServiceById = (
  services: NestedService[],
  id: number
): NestedService | null => {
  for (const service of services) {
    if (service.id === id) return service;
    if (service.subcategory?.length > 0) {
      const found = findServiceById(service.subcategory, id);
      if (found) return found;
    }
  }
  return null;
};

const getFullPath = (
  targetId: number,
  categories: NestedService[]
): string => {
  const buildPath = (
    categories: NestedService[],
    targetId: number,
    currentPath: string[] = []
  ): string[] | null => {
    for (const category of categories) {
      const newPath = [...currentPath, category.name];

      if (category.id === targetId) {
        return newPath;
      }

      if (category.subcategory?.length > 0) {
        const result = buildPath(category.subcategory, targetId, newPath);
        if (result) return result;
      }
    }
    return null;
  };

  const path = buildPath(categories, targetId);
  return path ? path.join(" > ") : "";
};

const countTotalServices = (services: NestedService[]): number => {
  return services.reduce((count, service) => {
    return (
      count +
      (service.subcategory?.length > 0
        ? countTotalServices(service.subcategory)
        : 1)
    );
  }, 0);
};

// Load from localStorage
const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  }
  return defaultValue;
};

// Save to localStorage
const saveToLocalStorage = (key: string, value: unknown) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const useServiceBookingStore = create<ServiceBookingState>(
  (set, get) => ({
    // Initial state
    cartItems: loadFromLocalStorage<CartItem[]>("cart", []),
    userInfo: loadFromLocalStorage<UserInfo>("userInfo", {
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
    }),
    currentServices: [],
    navigationPath: [],
    currentStep: "services",
    isSubmitting: false,
    isLoading: true,
    nestedServices: [],

    // Cart actions
    addToCart: (service: NestedService) => {
      const { cartItems, navigationPath } = get();
      const existingItem = findCartItem(cartItems, service.id);
      let updatedCart: CartItem[] = [];

      const fullPath = [
        ...navigationPath,
        { id: service.id, name: service.name },
      ]
        .map((item) => item.name)
        .join(" > ");

      if (existingItem) {
        updatedCart = cartItems.map((item) =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: service.id,
          name: service.name,
          price: 0,
          quantity: 1,
          fullPath,
        };
        updatedCart = [...cartItems, newItem];
      }

      set({ cartItems: updatedCart });
      saveToLocalStorage("cart", updatedCart);
    },

    removeFromCart: (serviceId: number) => {
      const { cartItems } = get();
      const existingItem = findCartItem(cartItems, serviceId);

      if (existingItem && existingItem.quantity > 1) {
        const updatedCart = cartItems.map((item) =>
          item.id === serviceId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        set({ cartItems: updatedCart });
        saveToLocalStorage("cart", updatedCart);
      } else {
        const updatedCart = cartItems.filter((item) => item.id !== serviceId);
        set({ cartItems: updatedCart });
        saveToLocalStorage("cart", updatedCart);
      }
    },

    removeServiceFromCart: (serviceId: number) => {
      const { cartItems } = get();
      const updatedCart = cartItems.filter((item) => item.id !== serviceId);
      set({ cartItems: updatedCart });
      saveToLocalStorage("cart", updatedCart);
    },

    increaseQuantity: (serviceId: number) => {
      const { cartItems } = get();
      const updatedCart = cartItems.map((item) =>
        item.id === serviceId ? { ...item, quantity: item.quantity + 1 } : item
      );
      set({ cartItems: updatedCart });
      saveToLocalStorage("cart", updatedCart);
    },

    handlePriceChange: (
      serviceId: number,
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { cartItems } = get();
      const newPrice = parseFloat(e.target.value) || 0;
      const updatedCart = cartItems.map((item) =>
        item.id === serviceId ? { ...item, price: newPrice } : item
      );
      set({ cartItems: updatedCart });
      saveToLocalStorage("cart", updatedCart);
    },

    // Navigation actions
    navigateToSubcategory: (service: NestedService) => {
      if (service.subcategory?.length > 0) {
        set({
          currentServices: service.subcategory,
          navigationPath: [
            ...get().navigationPath,
            { id: service.id, name: service.name },
          ],
        });
      }
    },

    navigateBack: () => {
      const { navigationPath, nestedServices } = get();
      if (navigationPath.length === 0) return;

      const newPath = navigationPath.slice(0, -1);
      let services = nestedServices;

      for (const pathItem of newPath) {
        const foundService = findServiceById(services, pathItem.id);
        if (foundService?.subcategory) {
          services = foundService.subcategory;
        }
      }

      set({
        navigationPath: newPath,
        currentServices: services,
      });
    },

    navigateToRoot: () => {
      set({
        currentServices: get().nestedServices,
        navigationPath: [],
      });
    },

    navigateToBreadcrumb: (index: number) => {
      const { navigationPath, nestedServices } = get();
      const newPath = navigationPath.slice(0, index + 1);
      let services = nestedServices;

      for (const pathItem of newPath) {
        const foundService = findServiceById(services, pathItem.id);
        if (foundService?.subcategory) {
          services = foundService.subcategory;
        }
      }

      set({
        navigationPath: newPath,
        currentServices: services,
      });
    },

    // Order actions
    handleOrderConfirm: () => {
      set({ currentStep: "user-info" });
    },

    handleBackToServices: () => {
      set({ currentStep: "services" });
    },

    handleSubmitOrder: async (e: React.FormEvent) => {
      e.preventDefault();
      set({ isSubmitting: true });

      try {
        const { cartItems, userInfo } = get();
        const orderItems = cartItems.map(
          (item) =>
            new OrderItemDto({
              service_id: item.id,
              quantity: item.quantity,
              unit_price: item.price,
            })
        );

        const orderData = new OrderDto({
          user: {
            full_name: userInfo.name,
            phone_number: userInfo.phone,
            email: userInfo.email,
            address: userInfo.address,
            city: userInfo.city,
          },
          orderItems,
        });

        await addOrder(orderData);
        set({ currentStep: "confirmation" });

        setTimeout(() => {
          get().resetBooking();
        }, 3000);
      } catch (error) {
        console.error("Error submitting order:", error);
        toast.error("Failed to submit order");
      } finally {
        set({ isSubmitting: false });
      }
    },

    handleUserInfoChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      const updatedUserInfo = { ...get().userInfo, [name]: value };
      set({ userInfo: updatedUserInfo });
      saveToLocalStorage("userInfo", updatedUserInfo);
    },

    handleDefaultvalue: async (cartItems: OrderItemDto[], userInfo: UserDto) => {
      try {
        const services = await getServicesNestedInfo();

        const mappedCartItems = cartItems.map((item) => ({
          id: item.service_id,
          name: item.service?.name || "",
          price: item.unit_price,
          quantity: item.quantity,
          fullPath: getFullPath(item.service_id, services),
        }));

        set({
          cartItems: mappedCartItems,
          userInfo: {
            name: userInfo.full_name || "",
            phone: userInfo.phone_number || "",
            email: "",
            address: userInfo.address || "",
            city: userInfo.city || "",
          },
        });

        saveToLocalStorage("cart", mappedCartItems);
        saveToLocalStorage("userInfo", userInfo);
      } catch (error) {
        console.error("Error setting default values:", error);
        toast.error("Failed to load order data");
      }
    },

    // Utility functions
    getTotalPrice: () => {
      const { cartItems } = get();
      return cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    getTotalQuantity: () => {
      const { cartItems } = get();
      return cartItems.reduce((total, item) => total + item.quantity, 0);
    },

    getItemQuantity: (serviceId: number) => {
      const item = findCartItem(get().cartItems, serviceId);
      return item?.quantity || 0;
    },

    countTotalServices,

    resetBooking: () => {
      const { nestedServices } = get();
      set({
        cartItems: [],
        currentStep: "services",
        userInfo: {
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        },
        currentServices: nestedServices,
        navigationPath: [],
      });

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
        localStorage.removeItem("userInfo");
      }
    },

    // Initialize services
    initializeServices: async (nestedServicesS?: NestedService[]) => {
      if (nestedServicesS && nestedServicesS.length) {
        set({
          nestedServices: nestedServicesS,
          currentServices: nestedServicesS,
          isLoading: false,
        });
      } else {
        try {
          set({ isLoading: true });
          const services = await getServicesNestedInfo();
          set({
            nestedServices: services,
            currentServices: services,
            isLoading: false,
          });
        } catch (error) {
          console.error("Error fetching services:", error);
          toast.error("Failed to load services");
          set({ isLoading: false });
        }
      }
    },
  })
);
