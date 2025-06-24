import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

// Define the OrderStatus type based on the possible return values
type OrderStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "CANCELLED"
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "UNKNOWN_STATUS";

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig: Record<
    OrderStatus,
    { label: string; variant: "secondary" | "default" | "destructive" }
  > = {
    REQUESTED: { label: "Requested", variant: "secondary" },
    ACCEPTED: { label: "Accepted", variant: "default" },
    CANCELLED: { label: "Cancelled", variant: "destructive" },
    PENDING: { label: "Pending", variant: "secondary" },
    IN_PROGRESS: { label: "Processing", variant: "default" },
    COMPLETED: { label: "Completed", variant: "default" },
    UNKNOWN_STATUS: { label: "Unknown", variant: "secondary" },
  };

  function toOrderStatus(status: string): OrderStatus {
    const normalized = status.toUpperCase().replace(/\s/g, "_");
    if (normalized in statusConfig) {
      return normalized as OrderStatus;
    }
    return "UNKNOWN_STATUS";
  }

  const orderStatus = toOrderStatus(status);
  const config = statusConfig[orderStatus];

  return (
    <Badge
      variant={config.variant}
      className={
        config.label === "Completed"
          ? "bg-green-100 text-green-800 hover:bg-green-200"
          : ""
      }
    >
      {config.label}
    </Badge>
  );
}


