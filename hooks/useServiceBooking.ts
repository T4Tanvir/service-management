"use client";

import { useState } from "react";
import {
  NestedService,
  CartItem,
  NavigationPath,
  UserInfo,
  OrderStep,
} from "../type/service.type";
import { mockNestedServices, servicePrices } from "../consttant/mock";

export const useServiceBooking = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentServices, setCurrentServices] =
    useState<NestedService[]>(mockNestedServices);
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

  const addToCart = (service: NestedService) => {
    const price = servicePrices[service.id] || 50;
    const fullPath = [...navigationPath, { id: service.id, name: service.name }]
      .map((item) => item.name)
      .join(" > ");

    const existingItem = cartItems.find((item) => item.id === service.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: service.id,
          name: service.name,
          price: price,
          quantity: 1,
          fullPath: fullPath,
        },
      ]);
    }
  };

  const removeFromCart = (serviceId: number) => {
    const existingItem = cartItems.find((item) => item.id === serviceId);

    if (existingItem && existingItem.quantity > 1) {
      setCartItems(
        cartItems.map((item) =>
          item.id === serviceId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setCartItems(cartItems.filter((item) => item.id !== serviceId));
    }
  };

  const removeServiceFromCart = (serviceId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== serviceId));
  };

  const increaseQuantity = (serviceId: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === serviceId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getItemQuantity = (serviceId: number) => {
    const item = cartItems.find((item) => item.id === serviceId);
    return item ? item.quantity : 0;
  };

  const navigateToSubcategory = (service: NestedService) => {
    setCurrentServices(service.subcategory);
    setNavigationPath([
      ...navigationPath,
      { id: service.id, name: service.name },
    ]);
  };

  const navigateBack = () => {
    if (navigationPath.length === 0) return;

    const newPath = [...navigationPath];
    newPath.pop();
    setNavigationPath(newPath);

    let services = mockNestedServices;
    for (const pathItem of newPath) {
      const foundService = services.find((s) => s.id === pathItem.id);
      if (foundService) {
        services = foundService.subcategory;
      }
    }
    setCurrentServices(services);
  };

  const navigateToRoot = () => {
    setCurrentServices(mockNestedServices);
    setNavigationPath([]);
  };

  const navigateToBreadcrumb = (index: number) => {
    const newPath = navigationPath.slice(0, index + 1);
    setNavigationPath(newPath);

    let services = mockNestedServices;
    for (const pathItem of newPath) {
      const foundService = services.find((s) => s.id === pathItem.id);
      if (foundService) {
        services = foundService.subcategory;
      }
    }
    setCurrentServices(services);
  };

  const countTotalServices = (services: NestedService[]): number => {
    let count = 0;
    for (const service of services) {
      if (service.subcategory.length === 0) {
        count += 1;
      } else {
        count += countTotalServices(service.subcategory);
      }
    }
    return count;
  };

  const handleUserInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderConfirm = () => {
    setCurrentStep("user-info");
  };

  const handleBackToServices = () => {
    setCurrentStep("services");
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setCurrentStep("confirmation");

    setTimeout(() => {
      resetBooking();
    }, 3000);
  };

  const resetBooking = () => {
    setCartItems([]);
    setCurrentStep("services");
    setUserInfo({
      name: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    });
    setCurrentServices(mockNestedServices);
    setNavigationPath([]);
  };

  return {
    cartItems,
    currentServices,
    navigationPath,
    currentStep,
    userInfo,
    isSubmitting,
    addToCart,
    removeFromCart, //single function to remove an item from the cart
    removeServiceFromCart, // function to remove a service from the cart
    increaseQuantity,
    getTotalPrice,
    getTotalQuantity,
    getItemQuantity,
    navigateToSubcategory,
    navigateBack,
    navigateToRoot,
    navigateToBreadcrumb,
    countTotalServices,
    handleUserInfoChange,
    handleOrderConfirm,
    handleBackToServices,
    handleSubmitOrder,
    resetBooking,
  };
};
