"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShoppingCart, Plus, Minus } from "lucide-react";

// Define interfaces for type safety
interface NestedService {
  id: string;
  name: string;
  price?: number;
  // Removed subcategory: NestedService[] to avoid type conflict
}

interface CartItem extends NestedService {
  quantity: number;
  category: string;
  subcategory: string; // subcategory is a string in CartItem
}

interface Subcategory {
  name: string;
  services: NestedService[];
}

interface Category {
  name: string;
  subcategories: Record<string, Subcategory>;
}

interface ServiceCategories {
  [key: string]: Category;
}

// Define the service categories with explicit typing
const serviceCategories: ServiceCategories = {
  plumbing: {
    name: "Plumbing Service",
    subcategories: {
      "plumbing-checkup": {
        name: "Plumbing Checkup",
        services: [
          { id: "pipe-inspection", name: "Pipe Inspection", price: 50 },
          { id: "leak-detection", name: "Leak Detection", price: 75 },
          { id: "water-pressure-test", name: "Water Pressure Test", price: 40 },
        ],
      },
      "water-tap-servicing": {
        name: "Water Tap Servicing",
        services: [
          { id: "tap-repair", name: "Tap Repair", price: 30 },
          { id: "tap-replacement", name: "Tap Replacement", price: 80 },
          { id: "faucet-cleaning", name: "Faucet Cleaning", price: 25 },
        ],
      },
      "sink-issues": {
        name: "Sink Issues",
        services: [
          { id: "sink-unclogging", name: "Sink Unclogging", price: 60 },
          { id: "sink-repair", name: "Sink Repair", price: 90 },
          { id: "drain-cleaning", name: "Drain Cleaning", price: 45 },
        ],
      },
    },
  },
  electrical: {
    name: "Electrical Service",
    subcategories: {
      "electrical-checkup": {
        name: "Electrical Checkup",
        services: [
          { id: "wiring-inspection", name: "Wiring Inspection", price: 70 },
          { id: "circuit-testing", name: "Circuit Testing", price: 55 },
          { id: "safety-check", name: "Safety Check", price: 65 },
        ],
      },
      "appliance-repair": {
        name: "Appliance Repair",
        services: [
          { id: "fan-repair", name: "Fan Repair", price: 40 },
          {
            id: "light-fixture",
            name: "Light Fixture Installation",
            price: 85,
          },
          { id: "switch-replacement", name: "Switch Replacement", price: 35 },
        ],
      },
    },
  },
  cleaning: {
    name: "Cleaning Service",
    subcategories: {
      "deep-cleaning": {
        name: "Deep Cleaning",
        services: [
          { id: "kitchen-cleaning", name: "Kitchen Deep Clean", price: 120 },
          { id: "bathroom-cleaning", name: "Bathroom Deep Clean", price: 100 },
          { id: "living-room-cleaning", name: "Living Room Clean", price: 80 },
        ],
      },
      "regular-cleaning": {
        name: "Regular Cleaning",
        services: [
          { id: "weekly-cleaning", name: "Weekly Cleaning", price: 60 },
          { id: "monthly-cleaning", name: "Monthly Cleaning", price: 200 },
          { id: "one-time-cleaning", name: "One-time Cleaning", price: 150 },
        ],
      },
    },
  },
};

export default function ServiceBooking() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleServiceToggle = (service: NestedService, checked: boolean) => {
    if (checked) {
      setCartItems([
        ...cartItems,
        {
          ...service,
          category: serviceCategories[selectedCategory].name,
          subcategory:
            serviceCategories[selectedCategory].subcategories[selectedSubcategory]
              .name,
          quantity: 1,
        },
      ]);
    } else {
      setCartItems(cartItems.filter((item) => item.id !== service.id));
    }
  };

  const increaseQuantity = (serviceId: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === serviceId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (serviceId: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === serviceId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeFromCart = (serviceId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== serviceId));
  };

  const getTotalPrice = (): number => {
    return cartItems.reduce(
      (total, item) => total + (item.price ?? 0) * item.quantity,
      0
    );
  };

  const resetForm = () => {
    setSelectedCategory("");
    setSelectedSubcategory("");
    setCartItems([]);
  };

  return (
    <div className="p-8">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Book Services
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Select Services</DialogTitle>
            <DialogDescription>
              Choose from our available service categories and add them to your
              cart.
            </DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6 h-[70vh]">
            {/* Left Side - Service Selection Form */}
            <div className="space-y-6 overflow-y-auto pr-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Service Category</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={(value: string) => {
                      setSelectedCategory(value);
                      setSelectedSubcategory("");
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(serviceCategories).map(([key, category]) => (
                        <SelectItem key={key} value={key}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCategory && (
                  <div className="space-y-2">
                    <Label htmlFor="subcategory">Service Type</Label>
                    <Select
                      value={selectedSubcategory}
                      onValueChange={setSelectedSubcategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(
                          serviceCategories[selectedCategory].subcategories
                        ).map(([key, subcategory]) => (
                          <SelectItem key={key} value={key}>
                            {subcategory.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedCategory && selectedSubcategory && (
                  <div className="space-y-3">
                    <Label>Available Services</Label>
                    <div className="space-y-3">
                      {serviceCategories[selectedCategory].subcategories[
                        selectedSubcategory
                      ].services.map((service) => (
                        <div
                          key={service.id}
                          className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50"
                        >
                          <Checkbox
                            id={service.id}
                            checked={cartItems.some(
                              (item) => item.id === service.id
                            )}
                            onCheckedChange={(checked: boolean) =>
                              handleServiceToggle(service, checked)
                            }
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor={service.id}
                              className="font-medium cursor-pointer"
                            >
                              {service.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              ${service.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Cart Section */}
            <div className="border-l pl-6">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Your Cart ({cartItems.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No services selected</p>
                      <p className="text-sm">
                        Choose services from the left to add them here
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start justify-between p-3 bg-muted/50 rounded-lg"
                          >
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <div className="flex gap-1 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {item.category}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {item.subcategory}
                                </Badge>
                              </div>
                              <p className="text-sm font-medium text-green-600 mt-1">
                                ${item.price} x {item.quantity} = $
                                {(item.price ?? 0) * item.quantity}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 bg-white rounded-lg border">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => decreaseQuantity(item.id)}
                                  className="h-8 w-8 p-0"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="px-2 py-1 text-sm font-medium min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => increaseQuantity(item.id)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-lg font-semibold">
                          <span>Total:</span>
                          <span className="text-green-600">
                            ${getTotalPrice()}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <Button className="w-full" size="lg">
                            Proceed to Checkout
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={resetForm}
                          >
                            Clear All
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}