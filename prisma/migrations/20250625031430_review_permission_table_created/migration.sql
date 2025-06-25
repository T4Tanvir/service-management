-- CreateTable
CREATE TABLE "reviewPermission" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviewPermission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reviewPermission_uuid_key" ON "reviewPermission"("uuid");

-- AddForeignKey
ALTER TABLE "reviewPermission" ADD CONSTRAINT "reviewPermission_phone_number_fkey" FOREIGN KEY ("phone_number") REFERENCES "users"("phone_number") ON DELETE RESTRICT ON UPDATE CASCADE;
