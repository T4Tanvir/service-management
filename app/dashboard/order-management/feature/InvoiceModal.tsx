"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "../../../../type/order.type";
import { StatusBadge } from "./StatusBadge";

interface InvoiceModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InvoiceModal({ order, isOpen, onClose }: InvoiceModalProps) {
  if (!order) return null;

  const totalAmount = order.price + (order.tax || 0) - (order.discount || 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Invoice</DialogTitle>
          <DialogDescription>Order ID: {order.order_id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 p-6 bg-white">
          {/* Company Header */}
          <div className="text-center border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-800">Akta Company</h1>
            <p className="text-gray-600">123 Business Area, Dhaka-1000</p>
            <p className="text-gray-600">
              Phone: +880 2-1234567 | Email: info@akta.com
            </p>
          </div>

          {/* Invoice Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">Bill To:</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{order.name}</p>
                <p className="text-gray-600">{order.phone}</p>
                {order.email && <p className="text-gray-600">{order.email}</p>}
                {order.address && (
                  <p className="text-gray-600">{order.address}</p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Invoice Info:</h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Invoice No:</span>
                  <span className="font-medium">{order.order_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium">
                    {new Date(order.order_date).toLocaleDateString("en-US")}
                  </span>
                </div>
                {order.due_date && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Date:</span>
                    <span className="font-medium">
                      {new Date(order.due_date).toLocaleDateString("en-US")}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Items Table */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Product Details:</h2>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold">
                      Product Name
                    </th>
                    <th className="text-center p-4 font-semibold">Quantity</th>
                    <th className="text-right p-4 font-semibold">Unit Price</th>
                    <th className="text-right p-4 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-4">{order.product_name}</td>
                    <td className="p-4 text-center">{order.qty}</td>
                    <td className="p-4 text-right">
                      ৳{order.unit_price.toLocaleString()}
                    </td>
                    <td className="p-4 text-right font-medium">
                      ৳{order.price.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Invoice Summary */}
          <div className="flex justify-end">
            <div className="w-full md:w-1/2">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>৳{order.price.toLocaleString()}</span>
                </div>
                {order.discount && order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-৳{order.discount.toLocaleString()}</span>
                  </div>
                )}
                {order.tax && order.tax > 0 && (
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>৳{order.tax.toLocaleString()}</span>
                  </div>
                )}
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span>৳{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-600 text-sm border-t pt-4">
            <p>Thank you for doing business with us!</p>
            <p>For any questions, contact: +880 2-1234567</p>
          </div>

          {/* Print Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => window.print()}
              className="flex items-center gap-2"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
