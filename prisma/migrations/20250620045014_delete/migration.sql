/*
  Warnings:

  - The values [30,40,50] on the enum `TaskStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `address_line` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `provider_id` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `scheduled_at` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `service_id` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `task_description` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskStatus_new" AS ENUM ('0', '10', '20');
ALTER TABLE "tasks" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "tasks" ALTER COLUMN "status" TYPE "TaskStatus_new" USING ("status"::text::"TaskStatus_new");
ALTER TYPE "TaskStatus" RENAME TO "TaskStatus_old";
ALTER TYPE "TaskStatus_new" RENAME TO "TaskStatus";
DROP TYPE "TaskStatus_old";
ALTER TABLE "tasks" ALTER COLUMN "status" SET DEFAULT '0';
COMMIT;

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_service_id_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "address_line",
DROP COLUMN "city",
DROP COLUMN "comment",
DROP COLUMN "name",
DROP COLUMN "phone_number",
DROP COLUMN "provider_id",
DROP COLUMN "scheduled_at",
DROP COLUMN "service_id",
DROP COLUMN "total_price",
ADD COLUMN     "serviceId" INTEGER,
ADD COLUMN     "task_description" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email" TEXT;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE CASCADE;
