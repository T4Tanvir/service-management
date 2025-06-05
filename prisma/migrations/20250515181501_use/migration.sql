/*
  Warnings:

  - You are about to drop the column `longDescription` on the `service_details` table. All the data in the column will be lost.
  - You are about to drop the column `shortDescription` on the `service_details` table. All the data in the column will be lost.
  - You are about to drop the column `addressLine` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `addressLine` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone_number]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `long_description` to the `service_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short_description` to the `service_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_line` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_line` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_phoneNumber_key";

-- AlterTable
ALTER TABLE "service_details" DROP COLUMN "longDescription",
DROP COLUMN "shortDescription",
ADD COLUMN     "long_description" TEXT NOT NULL,
ADD COLUMN     "short_description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "addressLine",
DROP COLUMN "phoneNumber",
ADD COLUMN     "address_line" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "addressLine",
DROP COLUMN "fullName",
DROP COLUMN "phoneNumber",
ADD COLUMN     "address_line" TEXT NOT NULL,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");
