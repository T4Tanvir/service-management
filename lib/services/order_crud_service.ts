import { orderStatusNameValue } from "@/consttant/order";
import { OrderDto } from "@/dtos/order.dto";
import { ClientError } from "@/errors/error";
import { OrderStatus } from "@/generated/prisma";
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

export const edit = async (uuid: string, data: OrderDto): Promise<OrderDto> => {
  if (!uuid) {
    throw ClientError.invalidError("Order UUID is required");
  }
  if (!data.user?.phone_number || !data.user?.full_name) {
    throw ClientError.invalidError(
      "User phone number and full name are required"
    );
  }
  if (!data.orderItems || data.orderItems.length === 0) {
    throw ClientError.invalidError("Order items are required");
  }

  const isOrderExist = await prisma.order.findUnique({
    where: { uuid },
  });

  if (!isOrderExist) throw ClientError.invalidError("Order not Exist");
  if (isOrderExist.status === "COMPLETED") {
    throw ClientError.invalidError("Cannot edit a completed order");
  }
  if (isOrderExist.status === "CANCELLED") {
    throw ClientError.invalidError("Cannot edit a cancelled order");
  }

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { phone_number: data.user?.phone_number },
      data: {
        full_name: data.user?.full_name,
        address: data.user?.address || "",
      },
    });

    const orderItems = data.orderItems!.map((item) => ({
      service_id: item.service_id,
      order_id: isOrderExist.id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: Math.round(item.quantity * item.unit_price),
    }));

    const existingOrderItem = await prisma.orderItem.findMany({
      where: { order_id: isOrderExist.id },
      select: { id: true, service_id: true },
    });

    const deletedService = existingOrderItem.filter(
      (item) => !orderItems.some((i) => i.service_id === item.service_id)
    );

    if (deletedService.length > 0) {
      for (const orderItem of deletedService) {
        await prisma.orderItem.delete({
          where: {
            id: orderItem.id,
          },
        });
      }
    }

    await Promise.all(
      orderItems.map(async (item) => {
        const isExist = existingOrderItem.find(
          (i) => i.service_id === item.service_id
        );

        if (isExist) {
          return tx.orderItem.update({
            where: { id: isExist.id },
            data: {
              quantity: item.quantity,
              unit_price: item.unit_price,
              total_price: item.total_price,
            },
          });
        } else {
          return tx.orderItem.create({
            data: item,
          });
        }
      })
    );
  });

  const updatedOrder = await prisma.order.findFirst({
    where: { uuid },
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

  return new OrderDto(updatedOrder);
};

const getOrderStatus = (status: number) => {
  switch (status) {
    case orderStatusNameValue["REQUESTED"]:
      return OrderStatus.REQUESTED;
    case orderStatusNameValue["PENDING"]:
      return OrderStatus.PENDING;
    case orderStatusNameValue["IN_PROGRESS"]:
      return OrderStatus.IN_PROGRESS;
    case orderStatusNameValue["ACCEPTED"]:
      return OrderStatus.ACCEPTED;
    case orderStatusNameValue["COMPLETED"]:
      return OrderStatus.COMPLETED;
    case orderStatusNameValue["CANCELLED"]:
      return OrderStatus.CANCELLED;
    default:
      return OrderStatus.REQUESTED;
  }
};
export const editStatus = async (uuid: string, data: OrderDto) => {
  if (!uuid) {
    throw ClientError.invalidError("Order UUID is required");
  }

  const isOrderExist = await prisma.order.findUnique({
    where: { uuid },
    select: {
      status: true,
    },
  });

  if (!isOrderExist) throw ClientError.invalidError();

  if (data.status === null || data.status === undefined) {
    throw ClientError.invalidError("Please Provide statue");
  }

  if (data.status === isOrderExist.status) {
    throw ClientError.invalidError("Both data are same");
  }

  await prisma.order.update({
    where: { uuid },
    data: {
      status: getOrderStatus(Number(data.status)),
    },
  });

  const updatedOrder = await prisma.order.findFirst({
    where: { uuid },
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

  return new OrderDto(updatedOrder);
};
