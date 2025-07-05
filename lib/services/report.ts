
import { prisma } from "@/uitls/db";

export const getServiceAnalytics = async (startDate: Date, endDate: Date) => {
  const report = await prisma.service.findMany({
    select: {
      id: true,
      name: true,
      short_description: true,
      OrderItem: {
        where: {
          order: {
            created_at: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
        select: {
          quantity: true,
          total_price: true,
        },
      },
    },
  });

  return report.map((service) => {
    const total_orders = service.OrderItem.length;
    const total_quantity = service.OrderItem.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const total_revenue = service.OrderItem.reduce(
      (sum, item) => sum + item.total_price,
      0
    );
    const average_unit_price = total_revenue / total_quantity || 0;

    return {
      service_id: service.id,
      service_name: service.name,
      service_description: service.short_description,
      total_orders,
      total_quantity,
      total_revenue,
      average_unit_price,
    };
  });
};
