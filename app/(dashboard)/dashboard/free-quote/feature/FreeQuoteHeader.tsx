"use client";

import { CardHeader, CardTitle } from "@/components/ui/card";

// interface OrderManagementHeaderProps {
//   onNewOrder: () => void;
// }

export function FreeQuoteHeader() {
  return (
    <CardHeader>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <CardTitle className="text-2xl font-bold">
          Free Quote Mangement
        </CardTitle>
      </div>
    </CardHeader>
  );
}
