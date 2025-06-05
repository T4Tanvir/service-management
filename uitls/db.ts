import { PrismaClient } from "../generated/prisma";

// This ensures Prisma is properly initialized
let prismaInstance: PrismaClient | undefined = undefined;

// Check if we're in a production environment
if (process.env.NODE_ENV === "production") {
  prismaInstance = new PrismaClient();
} else {
  // In development, we want to reuse the same Prisma instance
  const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
  };

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }

  prismaInstance = globalForPrisma.prisma;
}

export const prisma = prismaInstance;
