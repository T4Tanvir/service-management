"use client";


import { Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { IFeature } from "@/type/feature.type";


interface FaqsListProps {
  features: IFeature[];
  onActionIdChange: (id: number | null, action: string) => void;
}

export function FeaturesList({ features, onActionIdChange }: FaqsListProps) {
  
  

  // Group features by service
  const groupedFeatures = features.reduce((acc, feature) => {
    if (!acc[feature.service.id]) {
      acc[feature.service.id] = [];
    }
    acc[feature.service.id].push(feature);
    return acc;
  }, {} as Record<string, IFeature[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedFeatures).map(([service, serviceFeatures]) => (
        <div key={service} className="space-y-3">
          <h3 className="text-lg font-medium">
            {serviceFeatures[0]?.service?.name ?? ""}
          </h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {serviceFeatures.map((feature) => (
              <Card key={feature.id}>
                <CardContent className="p-4 flex justify-between items-start">
                  <p className="text-sm mt-1">{feature.feature_text}</p>
                  <div className="flex space-x-1 ml-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onActionIdChange(feature.id, "edit")}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onActionIdChange(feature.id, "delete")}
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
