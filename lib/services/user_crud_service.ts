// // lib/user.ts

import { userStatusNameValuePair } from "@/consttant/userStatus";
import { UserDto } from "@/dtos/user.dto";
import { ClientError } from "@/errors/error";
import { Role } from "@/generated/prisma";
import { ICredential } from "@/type/credentials.type";
import { ChangePasswordData } from "@/type/user.type";
import { prisma } from "@/uitls/db";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

const create = async (data: UserDto) => {
  //const hashedPassword = await hash(data.password, 10);
  console.log(data);
  if (!data.phone_number || !data.address || !data.full_name) {
    throw ClientError.invalidError(
      "full_name, phone_number, and address are required"
    );
  }

  const isUserExist = await prisma.user.findFirst({
    where: { phone_number: data.phone_number },
  });

  if (isUserExist)
    throw ClientError.invalidError(
      "User already exists with this phone number."
    );

  // Create the user
  const user = await prisma.user.create({
    data: {
      full_name: data.full_name,
      phone_number: data.phone_number,
      email: data.email,
      city: data.city,
      address: data.address,
      created_at: data.created_at,
    },
  });

  return user;
};

const getAll = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return users;
};

const getUserRole = (role: number) => {
  switch (role) {
    case userStatusNameValuePair["CLIENT"]:
      return Role.CLIENT;
    case userStatusNameValuePair["EMPLOYEE"]:
      return Role.EMPLOYEE;
    case userStatusNameValuePair["ADMIN"]:
      return Role.ADMIN;
    default:
      return null;
  }
};

const edit = async (id: number, data: Partial<UserDto>) => {
  // Input validation
  if (!id) {
    throw ClientError.invalidError("Invalid user ID");
  }

  // Fetch existing user
  const existingUser = await prisma.user.findFirst({
    where: { id },
  });

  if (!existingUser) {
    throw ClientError.notExistsError("User");
  }

  data.role = getUserRole(Number(data.role)) || existingUser.role;
  // Define updatable fields
  const updatableFields = [
    "full_name",
    "phone_number",
    "email",
    "city",
    "address",
  ] as const;

  // Normalize empty strings to preserve existing values (except full_name which can be empty)
  const normalizedData = { ...data };
  updatableFields.forEach((field) => {
    if (
      normalizedData[field] !== undefined &&
      normalizedData[field]?.trim() === ""
    ) {
      normalizedData[field] = existingUser[field] ?? undefined;
    }
  });

  // Build update object with only changed fields
  const updateData: Partial<UserDto> = {};
  let hasChanges = false;

  if (data.role !== existingUser.role) {
    updateData.role = data.role;
    hasChanges = true;
  }
  updatableFields.forEach((field) => {
    const newValue = normalizedData[field];
    const existingValue = existingUser[field];

    if (newValue !== undefined && newValue !== existingValue) {
      updateData[field] = newValue;
      hasChanges = true;
    }
  });

  // Check if there are any changes
  if (!hasChanges) {
    throw ClientError.invalidError("No changes detected.");
  }

  // Validate phone number uniqueness if it's being updated
  if (updateData.phone_number) {
    const phoneExists = await prisma.user.findFirst({
      where: {
        phone_number: updateData.phone_number,
        id: { not: id }, // Exclude current user
      },
    });

    if (phoneExists) {
      throw ClientError.invalidError(
        "Another user exists with this phone number."
      );
    }
  }

  // Perform the update
  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
  });

  return updatedUser;
};

const isValidUser = async (
  credential: ICredential
): Promise<{ success: boolean; data?: User }> => {
  console.log(credential);
  const isExist = await prisma.user.findUnique({
    where: { phone_number: String(credential.phone_number) },
    select: {
      id: true,
      full_name: true,
      phone_number: true,
      password: true,
      role: true,
      email: true,
      city: true,
      address: true,
      created_at: true,
    },
  });

  if (!isExist)
    return {
      success: false,
    };

  if (isExist.role !== Role.ADMIN) {
    return { success: false };
  }

  const isMatch = await bcrypt.compare(credential.password, isExist.password);
  if (!isMatch)
    return {
      success: false,
    };

  return {
    success: true,
    data: {
      ...isExist,
    },
  };
};

const changePass = async (id: number, data: ChangePasswordData) => {
  if (!id || !data?.newPassword || !data?.confirmPassword) {
    throw ClientError.invalidError();
  }

  if (data.newPassword !== data.confirmPassword) {
    throw ClientError.invalidError();
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw ClientError.notExistsError("User");
  }

  // Hash the new password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.newPassword, saltRounds);

  // Update user's password in the database
  await prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
  });

  return { message: "Password updated successfully" };
};

export { create, getAll, edit, isValidUser, changePass };
