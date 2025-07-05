import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orderStatusNameValue } from "@/consttant/order";
import { quoteStatus } from "@/consttant/quoteStatus";
import { FreeQuoteDto } from "@/dtos/freeQuote.dto";
import { getServicesNestedInfo } from "@/lib/api-client/service";
import { NestedService } from "@/type/service.type";
import { Select } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { StatusBadge } from "../../order-management/feature/StatusBadge";
import AddNewOrder from "./AddNewOrder";

interface OrderTableProps {
  freeQuotes: FreeQuoteDto[];
  onStatusChange: (id: number, updatedStatus: number) => void;
}

export function FreeQuoteTable({
  freeQuotes,
  onStatusChange,
}: OrderTableProps) {
  const [nestedServices, setNestedServices] = useState<NestedService[]>([]);
  useEffect(() => {
    const nestedEffect = async () => {
      const services = await getServicesNestedInfo();
      setNestedServices(services);
    };
    nestedEffect();
  }, []);
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">#</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Phone Number</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Description</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {freeQuotes.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-muted-foreground"
              >
                No Free Quote Found
              </TableCell>
            </TableRow>
          ) : (
            freeQuotes.map((quotes, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{quotes.user?.full_name}</TableCell>
                <TableCell>{quotes.user?.phone_number}</TableCell>
                <TableCell>
                  <StatusBadge status={quotes.status} />
                </TableCell>
                <TableCell>{quotes.task_description}</TableCell>

                <TableCell className="font-medium">
                  {quotes.created_at
                    ? new Date(quotes.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    {nestedServices.length && (
                      <AddNewOrder
                        userDetail={quotes.user!}
                        nestedServices={nestedServices}
                      />
                    )}
                    <Select
                      value={String(orderStatusNameValue[quotes.status])}
                      onValueChange={(value: string) =>
                        onStatusChange(quotes.id, Number(value))
                      }
                    >
                      <SelectTrigger className="w-32 h-8" aria-label="Status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(quoteStatus).map((status) => (
                          <SelectItem
                            key={status}
                            value={String(orderStatusNameValue[status])}
                          >
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
