"use client";

import type React from "react";

import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceDto } from "@/dtos/service.dto";
import { editService } from "@/lib/api-client/service";
import { toast } from "react-toastify";

export function EditServiceDialog({
  service,
  open,
  parentServices,
  onOpenChange,
  onEditService,
}: {
  service: ServiceDto;
  open: boolean;
  parentServices?: ServiceDto[];
  onOpenChange: () => void;
  onEditService: (service: ServiceDto) => void;
}) {
  const [formData, setFormData] = useState<{
    name: string;
    short_description: string;
    image_url: string;
    long_description: string;
    parent_id: number | null;
  }>({
    name: "",
    image_url: "",
    short_description: "",
    long_description: "",
    parent_id: null,
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || "",
        image_url: service.image_url,
        short_description: service.short_description || "",
        long_description: service.details?.long_description || "",
        parent_id: service.parent_id || null,
      });
    }
  }, [service]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, parentService: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await editService(
        new ServiceDto({
          id: service.id,
          name: formData.name,
          image_url: formData.image_url,
          short_description: formData.short_description,
          details: {
            long_description: formData.long_description,
            short_description: formData.short_description,
          },
          parent_id: formData.parent_id,
        })
      );

      toast.success(response.message || "Service updated successfully");
      onEditService(response.data);
      onOpenChange();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Make changes to the service details.
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
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="short_description"
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="longDescription">Long Description</Label>
              <Textarea
                id="long_description"
                name="long_description"
                value={formData.long_description}
                onChange={handleChange}
                rows={4}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parentService">Parent Service (Optional)</Label>
              <Select
                value={
                  formData.parent_id !== null
                    ? String(formData.parent_id)
                    : undefined
                }
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a parent service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">None</SelectItem>
                  {parentServices?.map((service) => (
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
              onClick={() => onOpenChange()}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
