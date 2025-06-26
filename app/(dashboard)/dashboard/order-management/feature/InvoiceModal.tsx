"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrderDto } from "@/dtos/order.dto";

interface InvoiceModalProps {
  order: OrderDto | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InvoiceModal({ order, isOpen, onClose }: InvoiceModalProps) {
  if (!order) return null;

  const getTotallPrice = () => {
    if (!order || !order.orderItems) return 0;

    return order.orderItems.reduce(
      (total, item) => total + item.total_price,
      0
    );
  };

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    // Get only the invoice content without buttons
    const invoiceContent =
      document.querySelector(".invoice-content")?.innerHTML;

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice - ${1000 + order.id}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
            padding: 20px;
          }
          
          .space-y-6 > * + * {
            margin-top: 1.5rem;
          }
          
          .space-y-2 > * + * {
            margin-top: 0.5rem;
          }
          
          .space-y-3 > * + * {
            margin-top: 0.75rem;
          }
          
          .text-center { text-align: center; }
          .text-left { text-align: left; }
          .text-right { text-align: right; }
          
          .font-bold { font-weight: bold; }
          .font-semibold { font-weight: 600; }
          .font-medium { font-weight: 500; }
          
          .text-3xl { font-size: 1.875rem; }
          .text-xl { font-size: 1.25rem; }
          .text-lg { font-size: 1.125rem; }
          .text-sm { font-size: 0.875rem; }
          .text-xs { font-size: 0.75rem; }
          
          .text-gray-800 { color: #1f2937; }
          .text-gray-600 { color: #4b5563; }
          .text-green-600 { color: #059669; }
          
          .bg-gray-50 { 
            background-color: #f9fafb; 
            padding: 1rem;
            border-radius: 0.5rem;
          }
          
          .border { border: 1px solid #d1d5db; }
          .border-b { border-bottom: 1px solid #d1d5db; }
          .border-t { border-top: 1px solid #d1d5db; }
          
          .rounded-lg { border-radius: 0.5rem; }
          
          .p-4 { padding: 1rem; }
          .p-6 { padding: 1.5rem; }
          .pb-4 { padding-bottom: 1rem; }
          .pt-4 { padding-top: 1rem; }
          
          .mb-3 { margin-bottom: 0.75rem; }
          .mb-6 { margin-bottom: 1.5rem; }
          .my-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; }
          
          .grid { display: grid; }
          .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
          .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .gap-6 { gap: 1.5rem; }
          
          .flex { display: flex; }
          .justify-between { justify-content: space-between; }
          .justify-end { justify-content: flex-end; }
          
          .w-full { width: 100%; }
          .w-1\\/2 { width: 50%; }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
          }
          
          th, td {
            padding: 0.75rem;
            border: 1px solid #d1d5db;
          }
          
          th {
            background-color: #f9fafb;
            font-weight: 600;
          }
          
          .overflow-hidden {
            overflow: hidden;
          }
          
          hr {
            border: none;
            border-top: 1px solid #d1d5db;
            margin: 0.5rem 0;
          }
          
          .status-badge {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
          }
          
          .status-completed { background-color: #dcfce7; color: #166534; }
          .status-pending { background-color: #fef3c7; color: #92400e; }
          .status-processing { background-color: #dbeafe; color: #1e40af; }
          .status-cancelled { background-color: #fee2e2; color: #991b1b; }
          
          @media print {
            @page {
              margin: 1cm;
              size: A4;
            }
            
            body {
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        ${invoiceContent}
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto print-content">
          <DialogHeader className="no-print">
            <DialogTitle>Invoice</DialogTitle>
            <DialogDescription>Order ID: {1000 + order.id}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 p-6 bg-white">
            <div className="invoice-content">
              {/* Company Header */}
              <div className="text-center border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  Peace Home Empire
                </h1>
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
                    <p className="font-medium">{order.user?.full_name}</p>
                    <p className="text-gray-600">{order.user?.phone_number}</p>
                    {order.user?.address && (
                      <p className="text-gray-600">{order.user?.address}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Invoice Info:</h2>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Invoice No:</span>
                      <span className="font-medium">{1000 + order.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="font-medium">
                        {new Date(order.created_at!).toLocaleDateString(
                          "en-US"
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span
                        className={`status-badge status-${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
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
                        <th className="text-center p-4 font-semibold">
                          Quantity
                        </th>
                        <th className="text-right p-4 font-semibold">
                          Unit Price
                        </th>
                        <th className="text-right p-4 font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems!.map((item, index) => (
                        <tr key={index} className="border-t hover:bg-gray-50">
                          <td className="p-4">{item.service!.name}</td>
                          <td className="p-4 text-center">{item.quantity}</td>
                          <td className="p-4 text-right">
                            ৳{item.unit_price.toLocaleString()}
                          </td>
                          <td className="p-4 text-right font-medium">
                            ৳
                            {(item.quantity * item.unit_price).toLocaleString()}
                          </td>
                        </tr>
                      ))}
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
                      <span>৳{getTotallPrice().toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>-৳{0}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>৳{0}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount:</span>
                      <span>৳{getTotallPrice().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-gray-600 text-sm border-t pt-4">
                <p>Thank you for doing business with us!</p>
                <p>For any questions, contact: +880 2-1234567</p>
              </div>
            </div>

            {/* Print Button - Outside of invoice-content */}
            <div className="flex justify-center pt-4 no-print">
              <Button onClick={handlePrint} className="flex items-center gap-2">
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
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                Print Invoice
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
