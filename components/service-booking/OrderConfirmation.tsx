"use client";

import { Check } from "lucide-react";
import React from "react";

export const OrderConfirmation: React.FC = () => {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center text-center">
      <div className="bg-green-100 p-4 rounded-full mb-4">
        <Check className="h-12 w-12 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold mb-2">Order submitted successfully!</h3>
      <p className="text-gray-600 mb-6">We will contact you soon.</p>
      <p className="text-sm text-gray-500">
        This page will close automatically.
      </p>
    </div>
  );
};
