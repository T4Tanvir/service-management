import { OrderDto } from "@/dtos/order.dto";
import { ClientError } from "@/errors/error";
import { prisma } from "@/uitls/db";
import { v4 as uuidv4 } from "uuid";

export const create = async (data: OrderDto): Promise<OrderDto> => {
  if (!data.user?.phone_number || !data.user?.full_name) {
    throw ClientError.invalidError(
      "User phone number and full name are required"
    );
  }

  if (!data.orderItems || data.orderItems.length === 0)
    throw ClientError.invalidError("Order items are required");

  return await prisma.$transaction(async (tx) => {
    let userInfo = await tx.user.findUnique({
      where: { phone_number: data.user?.phone_number },
      select: {
        id: true,
        full_name: true,
      },
    });

    if (!userInfo) {
      userInfo = await tx.user.create({
        data: {
          phone_number: data.user!.phone_number,
          full_name: data.user!.full_name,
          address: data.user?.address || "",
        },
      });
    } else {
      await tx.user.update({
        where: { phone_number: data.user?.phone_number },
        data: {
          full_name: data.user?.full_name,
          address: data.user?.address || "",
        },
      });
    }

    const orderdata = {
      uuid: uuidv4(),
      user_id: userInfo.id,
      status: data.status,
    };

    const insertedOrder = await tx.order.create({
      data: orderdata,
    });

    // order item management
    const orderItems = data.orderItems!.map((item) => ({
      service_id: item.service_id,
      order_id: insertedOrder.id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: Math.round(item.quantity * item.unit_price),
    }));

    await tx.orderItem.createMany({
      data: orderItems,
    });

    const insertedOrderItems = await tx.orderItem.findMany({
      where: { order_id: insertedOrder.id },
    });

    console.log("Inserted Order Items:", insertedOrderItems);
    return new OrderDto({
      ...insertedOrder,
      orderItems: insertedOrderItems,
      user: {
        id: userInfo.id,
        full_name: userInfo.full_name,
        phone_number: data.user?.phone_number,
        address: data.user?.address || "",
      },
    });
  });
};

export const getAll = async (): Promise<OrderDto[]> => {
  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          full_name: true,
          phone_number: true,
          address: true,
        },
      },
      orderItems: {
        include: {
          service: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return orders.map((order) => new OrderDto(order));
};
