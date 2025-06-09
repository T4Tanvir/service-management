"use client";

import type React from "react";

import EditNestedServiceForm from "@/components/EditNestedServiceForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FeatureDto } from "@/dtos/feature.dto";
import { editFeature } from "@/lib/api-client/feature";
import { IFeature, IFormInitialState } from "@/type/feature.type";
import { NestedService } from "@/type/service.type";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

type PropsType = {
  feature: IFeature;
  open: boolean;
  serviceList: NestedService[];
  onOpenChange: (open: boolean) => void;
  onUpdateFeatureList: (feature: IFeature) => void;
  nestedServices: NestedService[];
};

export function EditFeatureDialog({
  feature,
  serviceList,
  open,
  onOpenChange,
  onUpdateFeatureList,
}: PropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const [formData, setFormData] = useState<IFormInitialState>({
    child_service_id: "",
    parent_service_id: "",
    feature_text: feature.feature_text,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService) {
      toast.error("Please Selece a Service");
    }

    setIsLoading(true);
    try {
      console.log(feature, formData);
      const dataNeedToUpdate = new FeatureDto({
        ...formData,
        id: feature.id,
        service_id: selectedService,
      });

      const response = await editFeature(dataNeedToUpdate);

      toast.success(response.message || "Feature updated successfully!");
      // Close dialog
      onUpdateFeatureList(response.data);
      onOpenChange(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data.error || "Failed to update FAQ");
      console.error("Error updating FAQ:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Feature</DialogTitle>
            <DialogDescription>
              Make changes to the feature details.
            </DialogDescription>
          </DialogHeader>
          <div>
            <EditNestedServiceForm
              serviceId={feature.service.id}
              services={serviceList}
              onServiceSelect={setSelectedService}
            />
          </div>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="feature_text">Feature Description</Label>
              <Input
                id="feature_text"
                name="feature_text"
                value={formData.feature_text}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
