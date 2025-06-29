// hooks/useServiceBookingState.ts
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
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useServiceBooking = (nestedServicesS: NestedService[]) => {
  // State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentServices, setCurrentServices] = useState<NestedService[]>([]);
  const [navigationPath, setNavigationPath] = useState<NavigationPath[]>([]);
  const [currentStep, setCurrentStep] = useState<OrderStep>("services");
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [nestedServices, setNestedServices] = useState<NestedService[]>([]);

  /**
   * ===============================================================
   *                   Cart utilities
   * ===============================================================
   */
  const findCartItem = useCallback(
    (serviceId: number) => cartItems.find((item) => item.id === serviceId),
    [cartItems]
  );

  const createCartItem = useCallback(
    (service: NestedService): CartItem => {
      const fullPath = [
        ...navigationPath,
        { id: service.id, name: service.name },
      ]
        .map((item) => item.name)
        .join(" > ");

      return {
        id: service.id,
        name: service.name,
        price: 0,
        quantity: 1,
        fullPath,
      };
    },
    [navigationPath]
  );

  /**
   * ===============================================================
   *                   Navigation utilities
   * ===============================================================
   */
  const findServiceById = useCallback(
    (services: NestedService[], id: number): NestedService | null => {
      for (const service of services) {
        if (service.id === id) return service;
        if (service.subcategory?.length > 0) {
          const found = findServiceById(service.subcategory, id);
          if (found) return found;
        }
      }
      return null;
    },
    []
  );

  const getFullPath = useCallback(
    (
      targetId: number,
      categories: NestedService[] = nestedServices
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
    },
    [nestedServices]
  );

  const navigateToServices = useCallback(
    (path: NavigationPath[]) => {
      let services = nestedServices;
      for (const pathItem of path) {
        const foundService = findServiceById(services, pathItem.id);
        if (foundService?.subcategory) {
          services = foundService.subcategory;
        }
      }
      setCurrentServices(services);
    },
    [nestedServices, findServiceById]
  );

  /**
   * ===============================================================
   *                   Cart Actions
   * ===============================================================
   *
   */
  const addToCart = useCallback(
    (service: NestedService) => {
      const existingItem = findCartItem(service.id);

      if (existingItem) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === service.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        const newItem = createCartItem(service);
        setCartItems((prevItems) => [...prevItems, newItem]);
      }
    },
    [findCartItem, createCartItem]
  );

  const removeFromCart = useCallback(
    (serviceId: number) => {
      const existingItem = findCartItem(serviceId);

      if (existingItem && existingItem.quantity > 1) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === serviceId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      } else {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== serviceId)
        );
      }
    },
    [findCartItem]
  );

  const removeServiceFromCart = useCallback((serviceId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== serviceId)
    );
  }, []);

  const increaseQuantity = useCallback((serviceId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === serviceId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const handlePriceChange = useCallback(
    (
      serviceId: number,
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const newPrice = parseFloat(e.target.value) || 0;
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === serviceId ? { ...item, price: newPrice } : item
        )
      );
    },
    []
  );

  /**
   * ================================================================
   *                        Navigation Actions
   * =================================================================
   *
   */
  const navigateToSubcategory = useCallback((service: NestedService) => {
    if (service.subcategory?.length > 0) {
      setCurrentServices(service.subcategory);
      setNavigationPath((prevPath) => [
        ...prevPath,
        { id: service.id, name: service.name },
      ]);
    }
  }, []);

  const navigateBack = useCallback(() => {
    if (navigationPath.length === 0) return;

    const newPath = navigationPath.slice(0, -1);
    setNavigationPath(newPath);
    navigateToServices(newPath);
  }, [navigationPath, navigateToServices]);

  const navigateToRoot = useCallback(() => {
    setCurrentServices(nestedServices);
    setNavigationPath([]);
  }, [nestedServices]);

  const navigateToBreadcrumb = useCallback(
    (index: number) => {
      const newPath = navigationPath.slice(0, index + 1);
      setNavigationPath(newPath);
      navigateToServices(newPath);
    },
    [navigationPath, navigateToServices]
  );

  // Order management
  const handleDefaultvalue = useCallback(
    async (cartItems: OrderItemDto[], userInfo: UserDto) => {
      try {
        const services = await getServicesNestedInfo();

        const mappedCartItems = cartItems.map((item) => ({
          id: item.service_id,
          name: item.service?.name || "",
          price: item.unit_price,
          quantity: item.quantity,
          fullPath: getFullPath(item.service_id, services),
        }));

        setCartItems(mappedCartItems);
        setUserInfo({
          name: userInfo.full_name || "",
          phone: userInfo.phone_number || "",
          email: "",
          address: userInfo.address || "",
          notes: userInfo.additional_info || "",
        });
      } catch (error) {
        console.error("Error setting default values:", error);
        toast.error("Failed to load order data");
      }
    },
    [getFullPath]
  );

  const createOrderData = useCallback(
    (uuid?: string) => {
      const orderItems = cartItems.map(
        (item) =>
          new OrderItemDto({
            service_id: item.id,
            quantity: item.quantity,
            unit_price: item.price,
          })
      );

      return new OrderDto({
        ...(uuid && { uuid }),
        user: {
          full_name: userInfo.name,
          phone_number: userInfo.phone,
          email: userInfo.email,
          address: userInfo.address,
          additional_info: userInfo.notes,
        },
        orderItems,
      });
    },
    [cartItems, userInfo]
  );

  const handleSubmitOrder = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const orderData = createOrderData();
        await addOrder(orderData);
        setCurrentStep("confirmation");

        resetBooking();
      } catch (error) {
        console.error("Error submitting order:", error);
        toast.error("Failed to submit order");
      } finally {
        setIsSubmitting(false);
      }
    },
    [createOrderData]
  );

  // User info management
  const handleUserInfoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setUserInfo((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  // Step management
  const handleOrderConfirm = useCallback(() => {
    setCurrentStep("user-info");
  }, []);

  const handleBackToServices = useCallback(() => {
    setCurrentStep("services");
  }, []);

  // Utility functions
  const getTotalPrice = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const getTotalQuantity = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const getItemQuantity = useCallback(
    (serviceId: number) => {
      const item = findCartItem(serviceId);
      return item?.quantity || 0;
    },
    [findCartItem]
  );

  const countTotalServices = useCallback(
    (services: NestedService[]): number => {
      return services.reduce((count, service) => {
        return (
          count +
          (service.subcategory?.length > 0
            ? countTotalServices(service.subcategory)
            : 1)
        );
      }, 0);
    },
    []
  );

  const resetBooking = useCallback(() => {
    setCartItems([]);
    setCurrentStep("services");
    setUserInfo({
      name: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    });
    setCurrentServices(nestedServices);
    setNavigationPath([]);
  }, [nestedServices]);

  // Initialize services
  useEffect(() => {
    const fetchNestedServices = async () => {
      try {
        setIsLoading(true);
        const services = await getServicesNestedInfo();
        console.log(services, "===============");
        setNestedServices(services);
        setCurrentServices(services);
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Failed to load services");
      } finally {
        setIsLoading(false);
      }
    };

    if (nestedServicesS && nestedServicesS.length) {
      setNestedServices(nestedServicesS);
      setCurrentServices(nestedServicesS);
    } else {
      fetchNestedServices();
    }
  }, []);

  return {
    // State
    cartItems,
    currentServices,
    navigationPath,
    currentStep,
    userInfo,
    isSubmitting,
    isLoading,
    nestedServices,

    // Cart actions
    addToCart,
    removeFromCart,
    removeServiceFromCart,
    increaseQuantity,
    handlePriceChange,

    // Navigation actions
    navigateToSubcategory,
    navigateBack,
    navigateToRoot,
    navigateToBreadcrumb,

    // Order actions
    handleOrderConfirm,
    handleBackToServices,
    handleSubmitOrder,
    handleUserInfoChange,
    handleDefaultvalue,

    // Utility functions
    getTotalPrice,
    getTotalQuantity,
    getItemQuantity,
    countTotalServices,
    resetBooking,
  };
};
