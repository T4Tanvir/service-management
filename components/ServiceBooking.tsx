"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Home,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
//import { useToast } from "@/hooks/use-toast"

interface NestedService {
  id: number;
  name: string;
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
  notes: string;
}

type OrderStep = "services" | "user-info" | "confirmation";

const mockNestedServices: NestedService[] = [
  {
    id: 1,
    name: "Plumbing",
    subcategory: [
      {
        id: 2,
        name: "Pipe Repair",
        subcategory: [
          {
            id: 6,
            name: "Leak Fixing",
            subcategory: [
              {
                id: 7,
                name: "Emergency Repair",
                subcategory: [],
              },
            ],
          },
        ],
      },
      {
        id: 3,
        name: "Drain Cleaning",
        subcategory: [],
      },
    ],
  },
  {
    id: 4,
    name: "Electrical",
    subcategory: [
      {
        id: 5,
        name: "Wiring",
        subcategory: [],
      },
    ],
  },
];

// Mock prices for services (in real app, this would come from API)
const servicePrices: Record<number, number> = {
  7: 150, // Emergency Repair
  3: 80, // Drain Cleaning
  5: 120, // Wiring
};

export default function ServiceBooking() {
  const [isOpen, setIsOpen] = useState(false);
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
  // const { toast } = useToast()

  const addToCart = (service: NestedService) => {
    const price = servicePrices[service.id] || 50; // Default price if not found
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

    // Find the services to display based on the new path
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

    // Find the services to display based on the new path
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
        count += 1; // This is a leaf service
      } else {
        count += countTotalServices(service.subcategory); // Recursively count
      }
    }
    return count;
  };

  const hasSubcategories = (service: NestedService): boolean => {
    return service.subcategory.length > 0;
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // // Show success notification
    // toast({
    //   title: "Order submitted successfully",
    //   description: "Your order has been submitted successfully. We will contact you soon.",
    // })

    // Reset form and close modal
    setIsSubmitting(false);
    setCurrentStep("confirmation");

    // After 3 seconds, reset everything
    setTimeout(() => {
      setIsOpen(false);
      setCartItems([]);
      setCurrentStep("services");
      setUserInfo({
        name: "",
        phone: "",
        email: "",
        address: "",
        notes: "",
      });
    }, 3000);
  };

  const renderServiceSelection = () => (
    <div className="grid md:grid-cols-2 gap-6 h-[70vh]">
      {/* Service Section */}
      <div className="space-y-4 overflow-y-auto pr-2">
        {/* Breadcrumb Navigation */}
        <div className="sticky top-0 bg-white py-2 border-b">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={navigateToRoot}
              className="p-1 h-auto"
            >
              <Home className="h-4 w-4" />
            </Button>
            {navigationPath.map((item, index) => (
              <div key={item.id} className="flex items-center gap-2">
                <span>{">"}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigateToBreadcrumb(index)}
                  className="p-1 h-auto text-blue-600 hover:text-blue-800"
                >
                  {item.name}
                </Button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              {navigationPath.length === 0
                ? "Service Category"
                : navigationPath[navigationPath.length - 1]?.name}
            </h3>
            {navigationPath.length > 0 && (
              <Button size="sm" variant="ghost" onClick={navigateBack}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Go Back
              </Button>
            )}
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-3">
          {currentServices.map((service) => (
            <Card
              key={service.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{service.name}</CardTitle>
                    {!hasSubcategories(service) && (
                      <p className="text-sm text-gray-600 mt-1">
                        ৳{servicePrices[service.id] || 50}
                      </p>
                    )}
                  </div>
                  {hasSubcategories(service) ? (
                    <Badge variant="secondary" className="text-xs">
                      {countTotalServices([service])} services
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      Service
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {hasSubcategories(service) && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-2">Subcategories:</p>
                    <div className="flex flex-wrap gap-1">
                      {service.subcategory.slice(0, 3).map((sub) => (
                        <Badge
                          key={sub.id}
                          variant="outline"
                          className="text-xs"
                        >
                          {sub.name}
                        </Badge>
                      ))}
                      {service.subcategory.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{service.subcategory.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  {!hasSubcategories(service) &&
                    getItemQuantity(service.id) > 0 && (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(service.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium">
                          {getItemQuantity(service.id)}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => increaseQuantity(service.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    )}

                  {hasSubcategories(service) ? (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => navigateToSubcategory(service)}
                      className="ml-auto"
                    >
                      Next <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => addToCart(service)}
                      className="ml-auto"
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      Add
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="border-l pl-6 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="h-5 w-5" />
          <h3 className="text-lg font-semibold text-gray-800">
            Cart ({cartItems.length})
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <Card key={item.id} className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.fullPath}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFromCart(item.id)}
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  >
                    ×
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFromCart(item.id)}
                      className="h-6 w-6 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => increaseQuantity(item.id)}
                      className="h-6 w-6 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <span className="text-sm font-medium">
                    ৳{item.price * item.quantity}
                  </span>
                </div>
              </Card>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg">৳{getTotalPrice()}</span>
            </div>

            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleOrderConfirm}
            >
              Confirm Order
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderUserInfoForm = () => (
    <div className="h-[70vh] overflow-y-auto">
      <div className="flex items-center gap-2 mb-6">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleBackToServices}
          className="p-1"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Go Back
        </Button>
        <h3 className="text-lg font-semibold">Personal Information</h3>
      </div>

      <form onSubmit={handleSubmitOrder} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={userInfo.name}
                onChange={handleUserInfoChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                value={userInfo.phone}
                onChange={handleUserInfoChange}
                placeholder="01XXXXXXXXX"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userInfo.email}
                onChange={handleUserInfoChange}
                placeholder="example@mail.com"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                name="address"
                value={userInfo.address}
                onChange={handleUserInfoChange}
                placeholder="Your current address"
                required
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Information</Label>
              <Textarea
                id="notes"
                name="notes"
                value={userInfo.notes}
                onChange={handleUserInfoChange}
                placeholder="Any additional information or instructions"
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Order Summary</h4>
          <div className="space-y-2 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>৳{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total</span>
              <span>৳{getTotalPrice()}</span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Submit Order"}
          </Button>
        </div>
      </form>
    </div>
  );

  const renderConfirmation = () => (
    <div className="h-[70vh] flex flex-col items-center justify-center text-center">
      <div className="bg-green-100 p-4 rounded-full mb-4">
        <Check className="h-12 w-12 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold mb-2">Order submitted successfully!</h3>
      <p className="text-gray-600 mb-6">We will contact you soon.</p>
      <p className="text-sm text-gray-500">
        This page will close automatically.
      </p>
    </div>
  );

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-full h-full sm:w-auto bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-md font-medium text-lg transition-all duration-300 transform hover:scale-105">
            Book Service
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              {currentStep === "services" && "Select Service"}
              {currentStep === "user-info" && "Enter Personal Information"}
              {currentStep === "confirmation" && "Order Confirmation"}
            </DialogTitle>
          </DialogHeader>

          {currentStep === "services" && renderServiceSelection()}
          {currentStep === "user-info" && renderUserInfoForm()}
          {currentStep === "confirmation" && renderConfirmation()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
