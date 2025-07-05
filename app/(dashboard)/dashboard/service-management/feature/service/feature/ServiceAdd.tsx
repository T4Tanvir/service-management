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
import { Textarea } from "@/components/ui/textarea";
import { ServiceDetailDto } from "@/dtos/service_detail.dto";
import { addService } from "@/lib/api-client/service";
import { useState } from "react";

import NestedServiceForm from "@/components/NestedServiceForm";
import { S3Dto } from "@/dtos/s3.dto";
import { ServiceDto } from "@/dtos/service.dto";
import { uploadImageAndGetUrl } from "@/lib/api-client/s3/s3";
import { NestedService } from "@/type/service.type";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

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
  nestedServices,
  onAddService,
}: {
  open: boolean;
  nestedServices: NestedService[];
  onOpenChange: (open: boolean) => void;

  onAddService: (service: ServiceDto) => void;
}) {
  const [formData, setFormData] = useState(formInitData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return null;

    const dataNeedToPassForUrl = new S3Dto({
      key: `service-${Date.now()}-${selectedFile.name}`,
      contentType: selectedFile.type,
    });

    const publicUrl = await uploadImageAndGetUrl(
      dataNeedToPassForUrl,
      selectedFile
    );

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const imageUrl = await handleImageUpload();
      // Create data to send
      const dataNeedToSend = new ServiceDto({
        ...formData,
        image_url: imageUrl,
        parent_id: selectedService,
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
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto print-content">
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
              <Label htmlFor="image-upload">Select Service Image</Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="cursor-pointer"
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
          </div>
          <div className="pb-2">
            <NestedServiceForm
              services={nestedServices}
              onServiceSelect={setSelectedService}
            />
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
