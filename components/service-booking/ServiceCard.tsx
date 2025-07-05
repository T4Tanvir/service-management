"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Minus, Plus } from "lucide-react";
import React from "react";
import { NestedService } from "../../type/service.type";

interface ServiceCardProps {
  service: NestedService;
  itemQuantity: number;
  onAddToCart: (service: NestedService) => void;
  onRemoveFromCart: (serviceId: number) => void;
  onIncreaseQuantity: (serviceId: number) => void;
  onNavigateToSubcategory: (service: NestedService) => void;
  countTotalServices: (services: NestedService[]) => number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  itemQuantity,
  onAddToCart,
  onRemoveFromCart,
  onIncreaseQuantity,
  onNavigateToSubcategory,
  countTotalServices,
}) => {
  const hasSubcategories = service.subcategory.length > 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{service.name}</CardTitle>
          </div>
          {hasSubcategories ? (
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
        {hasSubcategories && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">Subcategories:</p>
            <div className="flex flex-wrap gap-1">
              {service.subcategory.slice(0, 3).map((sub) => (
                <Badge key={sub.id} variant="outline" className="text-xs">
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
          {!hasSubcategories && itemQuantity > 0 && (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onRemoveFromCart(service.id)}
                className="h-8 w-8 p-0"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-sm font-medium">{itemQuantity}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onIncreaseQuantity(service.id)}
                className="h-8 w-8 p-0"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          )}

          {hasSubcategories ? (
            <Button
              size="sm"
              variant="default"
              onClick={() => onNavigateToSubcategory(service)}
              className="ml-auto"
            >
              Next <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          ) : (
            <Button
              size="sm"
              variant="primary"
              onClick={() => onAddToCart(service)}
              className="ml-auto"
            >
              <Plus className="mr-1 h-3 w-3" />
              Add
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
