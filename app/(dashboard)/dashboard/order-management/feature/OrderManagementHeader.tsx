"use client";

import { CardHeader, CardTitle } from "@/components/ui/card";

export function OrderManagementHeader() {
  return (
    <CardHeader>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <CardTitle className="text-2xl font-bold">Order Management</CardTitle>
      </div>
    </CardHeader>
  );
}
