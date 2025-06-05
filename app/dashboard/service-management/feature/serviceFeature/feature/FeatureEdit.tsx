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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FeatureDto } from "@/dtos/feature.dto";
import { ServiceDto } from "@/dtos/service.dto";
import { editFeature } from "@/lib/api-client/feature";
import { IFeature, IFormInitialState } from "@/type/feature.type";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type PropsType = {
  feature: IFeature;
  open: boolean;
  serviceList: ServiceDto[];
  onOpenChange: (open: boolean) => void;
  onUpdateFeatureList: (feature: IFeature) => void;
};

export function EditFeatureDialog({
  feature,
  serviceList,
  open,
  onOpenChange,
  onUpdateFeatureList,
}: PropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<IFormInitialState>({
    child_service_id: "",
    parent_service_id: "",
    feature_text: feature.feature_text,
  });

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

    setIsLoading(true);
    try {
      console.log(feature, formData);
      const dataNeedToUpdate = new FeatureDto({
        ...formData,
        id: feature.id,
        service_id: Number(formData.child_service_id)
          ? formData.child_service_id
          : formData?.parent_service_id,
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

  useEffect(() => {
    let parentService = serviceList.find(
      (service) => service.id === feature.service.id
    );
    let childService = null;
    if (parentService?.parent_id) {
      childService = JSON.parse(JSON.stringify(parentService));
      parentService = serviceList.find(
        (service) => service.id === parentService?.parent_id
      );
    }

    setFormData({
      child_service_id: String(childService?.id) || "",
      parent_service_id: String(parentService?.id) || "",
      feature_text: feature.feature_text || "",
    });
  }, [feature, serviceList]);

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
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
