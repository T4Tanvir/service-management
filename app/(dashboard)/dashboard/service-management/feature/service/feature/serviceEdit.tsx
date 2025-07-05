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
import { Textarea } from "@/components/ui/textarea";
import { ServiceDto } from "@/dtos/service.dto";
import { editService } from "@/lib/api-client/service";
import { NestedService } from "@/type/service.type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { uploadImageAndGetUrl } from "@/lib/api-client/s3/s3";
import { S3Dto } from "@/dtos/s3.dto";

export function EditServiceDialog({
  service,
  open,
  nestedServices,
  onOpenChange,
  onEditService,
}: {
  service: ServiceDto;
  open: boolean;
  nestedServices: NestedService[];
  onOpenChange: () => void;
  onEditService: (service: ServiceDto) => void;
}) {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let currentImgUrl = formData.image_url;
      if (selectedFile) {
        currentImgUrl = (await handleImageUpload()) || "";
      }
      const response = await editService(
        new ServiceDto({
          id: service.id,
          name: formData.name,
          image_url: currentImgUrl,
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

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || "",
        image_url: service.image_url,
        short_description: service.short_description || "",
        long_description: service.details?.long_description || "",
        parent_id: selectedService || null,
      });
    }
  }, [service, selectedService]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto print-content">
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
            <div>
              <EditNestedServiceForm
                serviceId={service.parent_id}
                services={nestedServices}
                onServiceSelect={setSelectedService}
              />
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
