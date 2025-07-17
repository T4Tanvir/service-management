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
import { FaqDto } from "@/dtos/faq.dto";
import { ServiceDto } from "@/dtos/service.dto";
import { editFaq } from "@/lib/api-client/faq";
import { IFaq, IFormInitialState } from "@/type/faq.type";
import { NestedService } from "@/type/service.type";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type PropsType = {
  faq: IFaq;
  open: boolean;
  serviceList: ServiceDto[];
  onOpenChange: (open: boolean) => void;
  onUpdateFaqList: (faq: IFaq) => void;
  nestedServices: NestedService[];
};
export function EditFaqDialog({
  faq,
  open,
  serviceList,
  onOpenChange,
  nestedServices,
  onUpdateFaqList,
}: PropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [formData, setFormData] = useState<IFormInitialState>({
    child_service_id: "",
    parent_service_id: "",
    question: "",
    answer: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const dataNeedToUpdate = new FaqDto({
        ...formData,
        id: faq.id,
        service_id: selectedService,
      });

      const response = await editFaq(dataNeedToUpdate);

      toast.success(response.message || "FAQ updated successfully!");
      // Close dialog
      onUpdateFaqList(response.data);
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
      (service) => service.id === faq.service.id
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
      question: faq.question || "",
      answer: faq.answer || "",
    });
  }, [faq, serviceList]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto print-content">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit FAQ</DialogTitle>
            <DialogDescription>
              Make changes to the FAQ details.
            </DialogDescription>
          </DialogHeader>
          <div>
            <EditNestedServiceForm
              serviceId={faq.service.id}
              services={nestedServices}
              onServiceSelect={setSelectedService}
            />
          </div>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                name="question"
                value={formData.question}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="answer">Answer</Label>
              <Textarea
                id="answer"
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                rows={4}
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
