"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FreeQuoteDto } from "@/dtos/freeQuote.dto";
import {
  editFreeQuoteStatus,
  getAllFreeQuote,
} from "@/lib/api-client/free-quote";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FreeQuoteHeader } from "./feature/FreeQuoteHeader";
import { FreeQuoteTable } from "./feature/FreequoteTable";

export default function FreeQuote() {
  const [freeQuotes, setFreeQuote] = useState<FreeQuoteDto[]>([]);

  const handleStatusChange = async (id: number, updatedStatus: number) => {
    try {
      const response = await editFreeQuoteStatus(id, updatedStatus);

      toast.success("Free Quote status updated successfully");
      const updatedOrder = response.data as FreeQuoteDto;
      updateOrderList(updatedOrder);
    } catch (err) {
      toast.error("Failed to update order status");
      console.error(err);
    }
  };

  const updateOrderList = async (updatedQuote: FreeQuoteDto) => {
    const updatedQuotes = freeQuotes.map((quote) =>
      quote.id === updatedQuote.id ? updatedQuote : quote
    );

    setFreeQuote(updatedQuotes);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getAllFreeQuote();

      setFreeQuote(response.data || []);
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <FreeQuoteHeader />

        <CardContent>
          <FreeQuoteTable
            freeQuotes={freeQuotes}
            onStatusChange={handleStatusChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
