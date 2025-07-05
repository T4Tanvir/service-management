"use client";
import { selangorCities } from "@/consttant/selangorCities";
import { FreeQuoteDto } from "@/dtos/freeQuote.dto";
import { UserDto } from "@/dtos/user.dto";
import { addFreeQuote } from "@/lib/api-client/free-quote";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface FreeQuoteFormProps {
  onSubmit?: (formData: {
    name: string;
    email: string;
    message: string;
  }) => void;
}

const FreeQuoteForm: React.FC<FreeQuoteFormProps> = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    city: "", // Default city
    address: "",
    task_description: "",
  });
  const [isSubmitting, setSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    // if (!value) return;
    console.log("Selected city:", value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FreeQuoteDto({
        task_description: formData.task_description,
        user: new UserDto({
          full_name: formData.full_name,
          email: formData.email,
          phone_number: formData.phone_number,
          city: formData.city,
          address: formData.address,
        }),
      });

      const response = await addFreeQuote(data);
      toast.success(response);
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast.error("Failed to submit quote. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl" data-aos="fade-left">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Add Your Details to Get a Free Quote
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="full_name">First Name</Label>
            <Input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="service">City</Label>
              <select
                id="service"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                onChange={(e) => handleSelectChange("city", e.target.value)}
                required
              >
                <option value="">Select a City</option>
                {selangorCities.map((city) => (
                  <option key={city} value={city} className="cursor-pointer">
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={4}
                placeholder={`Address where the service is needed (e.g., street, area, etc.)`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="task_description">
              Describe Your Problem in Detail
            </Label>
            <Textarea
              id="task_description"
              name="task_description"
              className="min-h-[100px]"
              value={formData.task_description}
              onChange={handleInputChange}
              rows={4}
              placeholder={`Please provide detailed information about your Issue (e.g., type of plumbing issue, location, urgency, etc.)`}
            />
            <p className="text-sm text-muted-foreground">
              💡 Don&apos;t worry if you can&apos;t explain everything perfectly
              - our team will call you to discuss the details and schedule the
              best time for your service.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-md font-medium transition-colors"
          >
            {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FreeQuoteForm;
