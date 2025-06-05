"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FeatureDto } from "@/dtos/feature.dto";
import { IFeature, IFormInitialState } from "@/type/feature.type";
import { ServiceDto } from "@/dtos/service.dto";
import { addFeature } from "@/lib/api-client/feature";
import { Loader } from "lucide-react";
import { features } from "process";

const formInitialState: IFormInitialState = {
  parent_service_id: "",
  child_service_id: "",
  feature_text: "",
};
type PropsType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceList: ServiceDto[];
  onUpdateFeatureList: (feature: IFeature) => void;
};

export function AddFeatureDialog({
  open,
  onOpenChange,
  serviceList = [],
  onUpdateFeatureList,
}: PropsType) {
  const [formData, setFormData] = useState(formInitialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, chngFor: "parent" | "child") => {
    if (chngFor === "parent") {
      setFormData((prev) => ({
        ...prev,
        parent_service_id: value ?? "",
        child_service_id: "", // Reset child service when parent changes
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        child_service_id: value ?? "",
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!Number(formData.parent_service_id)) {
      alert("Please select both parent and child services.");
      return;
    }
    if (!formData.feature_text) {
      alert("Please fill Feature text.");
      return;
    }

    setIsLoading(true);
    console.log(formData);
    const dataNeedToInsert = new FeatureDto({
      ...formData,
      service_id: Number(formData.child_service_id)
        ? formData.child_service_id
        : formData.parent_service_id,
    });
    const response = await addFeature(dataNeedToInsert);

    // Here you would typically save the data to your backend
    console.log("Feature data to save:", response);

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
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="parent_service_id">Parent Service</Label>
              <Select
                value={
                  formData.parent_service_id.length
                    ? formData.parent_service_id
                    : undefined
                }
                onValueChange={(value) => handleSelectChange(value, "parent")}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceList
                    .filter((service) => !service.parent_id)
                    .map((service) => (
                      <SelectItem key={service.id} value={String(service.id)}>
                        {service.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="child_service_id">Child Service</Label>
              <Select
                value={formData.child_service_id}
                onValueChange={(value) => handleSelectChange(value, "child")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceList
                    .filter(
                      (service) =>
                        Number(formData.parent_service_id) === service.parent_id
                    )
                    .map((service) => (
                      <SelectItem key={service.id} value={String(service.id)}>
                        {service.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
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
