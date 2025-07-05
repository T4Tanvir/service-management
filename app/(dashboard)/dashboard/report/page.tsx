"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReportData } from "@/type/report.type";

export type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

const serviceData: ReportData[] = [
  {
    service_id: 1,
    service_name: "Web Development",
    service_description: "Complete web development services",
    total_orders: 15,
    total_quantity: 25,
    total_revenue: 125000.5,
    average_unit_price: 5000.02,
  },
  {
    service_id: 3,
    service_name: "Mobile App Development",
    service_description: "iOS and Android app development",
    total_orders: 8,
    total_quantity: 12,
    total_revenue: 96000.0,
    average_unit_price: 8000.0,
  },
  {
    service_id: 5,
    service_name: "UI/UX Design",
    service_description: "User interface and experience design",
    total_orders: 20,
    total_quantity: 35,
    total_revenue: 70000.0,
    average_unit_price: 2000.0,
  },
  {
    service_id: 2,
    service_name: "SEO Optimization",
    service_description: "Search engine optimization services",
    total_orders: 12,
    total_quantity: 18,
    total_revenue: 36000.0,
    average_unit_price: 2000.0,
  },
  {
    service_id: 4,
    service_name: "Digital Marketing",
    service_description: "Complete digital marketing solutions",
    total_orders: 6,
    total_quantity: 10,
    total_revenue: 25000.0,
    average_unit_price: 2500.0,
  },
  {
    service_id: 7,
    service_name: "Content Writing",
    service_description: "Professional content writing services",
    total_orders: 25,
    total_quantity: 50,
    total_revenue: 15000.0,
    average_unit_price: 300.0,
  },
];

export default function ServiceAnalyticsTable() {
  const [date, setDate] = useState <DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Format number
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Service Analytics
          </h1>
          <p className="text-muted-foreground">
            Overview of service performance and revenue data
          </p>
        </div>

        {/* Date Range Picker */}
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviceData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(
                serviceData.reduce(
                  (sum, service) => sum + service.total_orders,
                  0
                )
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                serviceData.reduce(
                  (sum, service) => sum + service.total_revenue,
                  0
                )
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Order Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                serviceData.reduce(
                  (sum, service) => sum + service.total_revenue,
                  0
                ) /
                  serviceData.reduce(
                    (sum, service) => sum + service.total_orders,
                    0
                  )
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Service Performance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Service ID</TableHead>
                  <TableHead>Service Name</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Description
                  </TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Avg. Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {serviceData.map((service) => (
                  <TableRow key={service.service_id}>
                    <TableCell className="font-medium">
                      #{service.service_id}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{service.service_name}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {service.service_description}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(service.total_orders)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(service.total_quantity)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(service.total_revenue)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(service.average_unit_price)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
