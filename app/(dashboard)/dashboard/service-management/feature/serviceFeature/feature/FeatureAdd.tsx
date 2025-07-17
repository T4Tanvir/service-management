"use client";

import type React from "react";

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
import { addFeature } from "@/lib/api-client/feature";
import { IFeature, IFormInitialState } from "@/type/feature.type";
import { NestedService } from "@/type/service.type";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import NestedServiceForm from "@/components/NestedServiceForm";

const formInitialState: IFormInitialState = {
  parent_service_id: "",
  child_service_id: "",
  feature_text: "",
};
type PropsType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  onUpdateFeatureList: (feature: IFeature) => void;
  nestedServices: NestedService[];
};

export function AddFeatureDialog({
  open,
  onOpenChange,
  onUpdateFeatureList,
  nestedServices,
}: PropsType) {
  const [formData, setFormData] = useState(formInitialState);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService) {
      toast.error("Please Select A Service");
    }

    setIsLoading(true);
    const dataNeedToInsert = new FeatureDto({
      ...formData,
      service_id: selectedService,
    });
    const response = await addFeature(dataNeedToInsert);

    // Reset form and close dialog
    setFormData(formInitialState);
    onOpenChange(false);
    setIsLoading(false);
    onUpdateFeatureList(response.data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Feature</DialogTitle>
            <DialogDescription>
              Create a new feature for a service.
            </DialogDescription>
          </DialogHeader>

          <div>
            <NestedServiceForm
              services={nestedServices}
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
              Save Feature
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
