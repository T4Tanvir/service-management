/*
  Warnings:

  - You are about to drop the column `user_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `address_line` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `FreeQuote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone_number` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `reviews` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `address` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_service_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_user_id_fkey";

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "user_id",
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "uuid" TEXT NOT NULL,
ALTER COLUMN "service_id" DROP NOT NULL,
ALTER COLUMN "comment" DROP NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "address_line",
ADD COLUMN     "address" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FreeQuote_id_key" ON "FreeQuote"("id");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_uuid_key" ON "reviews"("uuid");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_phone_number_fkey" FOREIGN KEY ("phone_number") REFERENCES "users"("phone_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE CASCADE;
