import { FreeQuoteDto } from "@/dtos/freeQuote.dto";
import { ClientError } from "@/errors/error";
import { Role, User } from "@/generated/prisma";
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
    console.log(userInfoNeedToInsert, "==========Now i insert data===========");
    insertedUserInfo = await prisma.user.create({
      data: userInfoNeedToInsert,
    });
    console.log(insertedUserInfo, "inserted user info");
  }

  const dataNeedToInsert = {
    user_id: isUserExists ? isUserExists.id : insertedUserInfo!.id,
    task_description: data.task_description,
  };

  await prisma.freeQuote.create({
    data: {
      user_id: dataNeedToInsert.user_id!,
      task_description: dataNeedToInsert.task_description,
    },
  });

  return "Free quote request created successfully";
};
