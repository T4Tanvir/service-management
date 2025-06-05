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
import { FaqDto } from "@/dtos/faq.dto";
import { ServiceDto } from "@/dtos/service.dto";
import { addFaq } from "@/lib/api-client/faq";
import { IFaq, IFormInitialState } from "@/type/faq.type";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const formInitialState: IFormInitialState = {
  parent_service_id: "",
  child_service_id: "",
  question: "",
  answer: "",
};

type PropsType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceList: ServiceDto[];
  onUpdateFaqList: (faq: IFaq) => void;
};
export function AddFaqDialog({
  open,
  onOpenChange,
  serviceList,
  onUpdateFaqList,
}: PropsType) {
  const [formData, setFormData] = useState(formInitialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    console.log("Form Data Submitted:", formData);

    const dataNeedToinsert = new FaqDto({
      ...formData,
      service_id: formData.child_service_id || formData?.parent_service_id,
    });

    try {
      setIsLoading(true);
      const response = await addFaq(dataNeedToinsert);
      console.log(response);

      toast.success(response.message || "FAQ added successfully!");

      setFormData(formInitialState);
      onUpdateFaqList(response.data);
      onOpenChange(false);
    } catch (error) {
      console.error("Error adding FAQ:", error);
      toast.error("Failed to add FAQ");
    } finally {
      setIsLoading(false);
    }

    // Reset form and close dialog
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New FAQ</DialogTitle>
            <DialogDescription>
              Create a new frequently asked question.
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
              Save FAQ
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
