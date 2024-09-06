-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "costumerId" INTEGER;

-- CreateTable
CREATE TABLE "Costumer" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" TEXT,
    "last_name" TEXT,
    "phone_number" TEXT,
    "email" TEXT,
    "user_address" TEXT,
    "region" TEXT,

    CONSTRAINT "Costumer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Costumer_email_key" ON "Costumer"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "Costumer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
