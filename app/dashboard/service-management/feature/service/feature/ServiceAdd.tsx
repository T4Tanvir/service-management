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
import { Textarea } from "@/components/ui/textarea";
import { ServiceDetailDto } from "@/dtos/service_detail.dto";
import { addService } from "@/lib/api-client/service";
import { useState } from "react";

import { ServiceDto } from "@/dtos/service.dto";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

const formInitData = {
  name: "",
  short_description: "",
  long_description: "",
  parent_id: "null",
  image_url: "",
};

export function AddServiceDialog({
  open,
  onOpenChange,
  parentServices = [],
  onAddService,
}: {
  open: boolean;
  parentServices?: ServiceDto[];
  onOpenChange: (open: boolean) => void;

  onAddService: (service: ServiceDto) => void;
}) {
  const [formData, setFormData] = useState(formInitData);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, parent_id: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create data to send
      const dataNeedToSend = new ServiceDto({
        ...formData,
        active: true,
        details: new ServiceDetailDto({
          short_description: formData.short_description,
          long_description: formData.long_description,
        }),
      });

      // Send data to backend
      const response = await addService(dataNeedToSend);

      console.log(response);
      toast.success("Service added successfully!");

      // Reset form and close dialog
      onAddService(response);
      setFormData(formInitData);
      onOpenChange(false);
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Failed to add service. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Create a new service to offer to your customers.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image_url">Service Image</Label>
              <Input
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="short_description">Short Description</Label>
              <Textarea
                id="short_description"
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="long_description">Long Description</Label>
              <Textarea
                id="long_description"
                name="long_description"
                value={formData.long_description}
                onChange={handleChange}
                rows={4}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parent_id">Parent Service (Optional)</Label>
              <Select
                name="parent_id"
                value={formData.parent_id}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a parent service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {parentServices.map((service) => (
                    <SelectItem key={service.id} value={String(service.id)}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              Save Service
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
