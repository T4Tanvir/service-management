/*
  Warnings:

  - You are about to drop the column `description` on the `service_details` table. All the data in the column will be lost.
  - Added the required column `longDescription` to the `service_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `service_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service_details" DROP COLUMN "description",
ADD COLUMN     "longDescription" TEXT NOT NULL,
ADD COLUMN     "shortDescription" TEXT NOT NULL;
