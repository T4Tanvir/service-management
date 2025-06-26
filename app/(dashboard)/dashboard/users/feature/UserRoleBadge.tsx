import { Badge } from "@/components/ui/badge";

interface UserRoleBadgeProps {
  role: string;
}

// Define the UserRole type based on the possible roles
type UserRole = "CLIENT" | "ADMIN" | "EMPLOYEE" | "UNKNOWN_ROLE";

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  const roleConfig: Record<
    UserRole,
    { label: string; variant: "secondary" | "default" | "destructive" }
  > = {
    CLIENT: { label: "Client", variant: "secondary" },
    ADMIN: { label: "Admin", variant: "destructive" },
    EMPLOYEE: { label: "Employee", variant: "default" },
    UNKNOWN_ROLE: { label: "Unknown", variant: "secondary" },
  };

  function toUserRole(role: string): UserRole {
    const normalized = role.toUpperCase().replace(/\s/g, "_");
    if (normalized in roleConfig) {
      return normalized as UserRole;
    }
    return "UNKNOWN_ROLE";
  }

  const userRole = toUserRole(role);
  const config = roleConfig[userRole];

  return (
    <Badge
      variant={config.variant}
      className={
        config.label === "Admin"
          ? "bg-red-100 text-red-800 hover:bg-red-200"
          : config.label === "Employee"
          ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
          : ""
      }
    >
      {config.label}
    </Badge>
  );
}
