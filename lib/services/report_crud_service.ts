import { prisma } from "@/uitls/db";

export async function generateServiceReport(startDate: Date, endDate: Date) {
  // Method 1: Using aggregation with groupBy
  const serviceReport = await prisma.orderItem.groupBy({
    by: ["service_id"],
    where: {
      order: {
        status: "COMPLETED", // Change this to your actual completed status
        created_at: {
          gte: startDate,
          lte: endDate,
        },
      },
    },
    _count: {
      id: true, // Count of order items
    },
    _sum: {
      quantity: true,
      total_price: true,
    },
    _avg: {
      unit_price: true,
    },
  });

  // Get service details for the report
  const serviceIds = serviceReport.map((item) => item.service_id);
  const services = await prisma.service.findMany({
    where: {
      id: {
        in: serviceIds,
      },
    },
    select: {
      id: true,
      name: true,
      short_description: true,
    },
  });

  // Combine the data
  const reportWithDetails = serviceReport.map((item) => {
    const service = services.find((s) => s.id === item.service_id);
    return {
      service_id: item.service_id,
      service_name: service?.name || "Unknown Service",
      service_description: service?.short_description,
      total_orders: item._count.id,
      total_quantity: item._sum.quantity || 0,
      total_revenue: item._sum.total_price || 0,
      average_unit_price: item._avg.unit_price || 0,
    };
  });

  // Sort by total revenue descending
  return reportWithDetails.sort((a, b) => b.total_revenue - a.total_revenue);
}
