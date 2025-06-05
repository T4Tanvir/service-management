/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `shortDescription` on the `services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "imageUrl",
DROP COLUMN "shortDescription",
ADD COLUMN     "image_url" VARCHAR(255),
ADD COLUMN     "short_description" VARCHAR(255);
