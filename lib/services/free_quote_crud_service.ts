import { quoteStatus } from "@/consttant/quoteStatus";
import { FreeQuoteDto } from "@/dtos/freeQuote.dto";
import { ClientError } from "@/errors/error";
import { QuoteStatus, User } from "@/generated/prisma";
import { prisma } from "@/uitls/db";

export const create = async (data: FreeQuoteDto): Promise<string> => {
  if (!data.user) {
    throw ClientError.invalidError("User data is required");
  }
  const userInfo = data.user;
  if (
    !userInfo.phone_number ||
    !userInfo.full_name ||
    !userInfo.address ||
    !userInfo.city
  ) {
    throw ClientError.invalidError(
      "User phone number, full name city and address are required"
    );
  }

  if (!data.task_description) {
    throw ClientError.invalidError("Task description is required");
  }

  const userInfoNeedToInsert = {
    full_name: userInfo.full_name,
    email: userInfo.email,
    phone_number: userInfo.phone_number,
    address: userInfo.address,
    city: userInfo.city,
  };

  const isUserExists = await prisma.user.findUnique({
    where: {
      phone_number: userInfo.phone_number,
    },
    select: {
      id: true,
      full_name: true,
    },
  });

  let insertedUserInfo: Partial<User> | null = null;
  if (isUserExists) {
    await prisma.user.update({
      where: {
        id: isUserExists.id,
      },
      data: userInfoNeedToInsert,
    });
  } else {
    insertedUserInfo = await prisma.user.create({
      data: userInfoNeedToInsert,
    });
  }

  const dataNeedToInsert = {
    user_id: isUserExists ? isUserExists.id : insertedUserInfo!.id,
    task_description: data.task_description,
  };
  console.log(dataNeedToInsert, "===============");
  await prisma.freeQuote.create({
    data: {
      user_id: dataNeedToInsert.user_id!,
      task_description: dataNeedToInsert.task_description,
    },
  });

  return "Free quote request created successfully";
};

export const getAll = async (): Promise<FreeQuoteDto[]> => {
  const freeFaqList = await prisma.freeQuote.findMany({
    include: {
      user: true,
    },
    orderBy: { id: "asc" },
  });

  return freeFaqList.map((item) => new FreeQuoteDto(item));
};

const getOrderStatus = (status: number) => {
  switch (status) {
    case quoteStatus["REQUESTED"]:
      return QuoteStatus.REQUESTED;
    case quoteStatus["ACCEPTED"]:
      return QuoteStatus.ACCEPTED;
    case quoteStatus["CANCELLED"]:
      return QuoteStatus.CANCELLED;
    default:
      return QuoteStatus.REQUESTED;
  }
};

export const editStatus = async (
  id: number,
  data: FreeQuoteDto
): Promise<FreeQuoteDto> => {
  console.log("edit status method call");
  if (!id) throw ClientError.invalidError("ID is required");
  console.log(id);
  if (typeof id !== "number" || isNaN(id)) {
    throw ClientError.invalidError("ID must be a valid number");
  }
  const existingQuote = await prisma.freeQuote.findFirst({
    where: { id: Number(id) },
  });
  
  if (!existingQuote) {
    throw ClientError.notExistsError("Free quote");
  }

  await prisma.freeQuote.update({
    where: { id: Number(id) },
    data: {
      status: getOrderStatus(Number(data.status)),
    },
  });

  const updatedData = await prisma.freeQuote.findUnique({
    where: { id: Number(id) },
    include: {
      user: true,
    },
  });

  return new FreeQuoteDto(updatedData);
};
