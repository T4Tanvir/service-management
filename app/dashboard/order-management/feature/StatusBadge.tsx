import { Badge } from "@/components/ui/badge";

type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

interface StatusBadgeProps {
  status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig: Record<
    OrderStatus,
    { label: string; variant: "secondary" | "default" | "destructive" }
  > = {
    pending: { label: "Pending", variant: "secondary" },
    processing: { label: "Processing", variant: "default" },
    completed: { label: "Completed", variant: "default" },
    cancelled: { label: "Cancelled", variant: "destructive" },
  };

  const config = statusConfig[status];
  return (
    <Badge
      variant={config.variant}
      className={
        status === "completed"
          ? "bg-green-100 text-green-800 hover:bg-green-200"
          : ""
      }
    >
      {config.label}
    </Badge>
  );
}
