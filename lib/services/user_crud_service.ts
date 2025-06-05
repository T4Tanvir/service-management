// // lib/user.ts

// import { UserRole } from "@/enums/user_role";
// import { prisma } from "@/uitls/db";
// import { compare, hash } from "bcrypt";


// // Types
// export type UserCreateInput = {
//   fullName: string;
//   phoneNumber: string;
//   password: string;
//   city: string;
//   addressLine: string;
//   role?: UserRole;
// };

// export type UserUpdateInput = Partial<Omit<UserCreateInput, "password">> & {
//   password?: string;
// };

// // CREATE
// const createUser = async (data: UserCreateInput) => {
//   const hashedPassword = await hash(data.password, 10);

//   // Create the user
//   const user: UserCreateInput = await prisma.user.create({
//     data: {
//       ...data,
//       password: hashedPassword,
//     },
//   });

//   // Return the user without the password
//   const { password: _, ...userWithoutPassword } = user;
//   return userWithoutPassword;
// };

// // READ
// const getAllUsers = async () => {
//   const users = await prisma.user.findMany({
//     select: {
//       id: true,
//       fullName: true,
//       phoneNumber: true,
//       city: true,
//       addressLine: true,
//       role: true,
//       createdAt: true,
//       // Exclude password for security
//     },
//   });

//   return users;
// };

// const getUserById = async (id: string) => {
//   const user = await prisma.user.findUnique({
//     where: { id },
//     select: {
//       id: true,
//       fullName: true,
//       phoneNumber: true,
//       city: true,
//       addressLine: true,
//       role: true,
//       createdAt: true,
//       // Exclude password for security
//       tasks: true,
//       reviews: true,
//     },
//   });

//   return user;
// };

// // UPDATE
// const updateUser = async (id: string, data: UserUpdateInput) => {
//   // If updating password, hash it first
//   const updateData = { ...data };

//   if (data.password) {
//     updateData.password = await hash(data.password, 10);
//   }

//   const updatedUser = await prisma.user.update({
//     where: { id },
//     data: updateData,
//     select: {
//       id: true,
//       fullName: true,
//       phoneNumber: true,
//       city: true,
//       addressLine: true,
//       role: true,
//       createdAt: true,
//       // Exclude password for security
//     },
//   });

//   return updatedUser;
// };

// // DELETE
// const suspendUser = async (id: string) => {
//   // Note: This might fail if there are related records that depend on this user
//   // Consider implementing cascade delete in your schema or handling related records first
//   await prisma.user.delete({
//     where: { id },
//   });

//   return { success: true };
// };

// // Authentication Helper
// const verifyUserCredentials = async (phoneNumber: string, password: string) => {
//   const user = await prisma.user.findUnique({
//     where: { phoneNumber },
//   });

//   if (!user) {
//     return null;
//   }

//   const passwordMatch = await compare(password, user.password);

//   if (!passwordMatch) {
//     return null;
//   }

//   // Return user without password
//   const { password: _, ...userWithoutPassword } = user;
//   return userWithoutPassword;
// };

// export {
//   createUser,
//   suspendUser,
//   getAllUsers,
//   getUserById,
//   updateUser,
//   verifyUserCredentials,
// };
