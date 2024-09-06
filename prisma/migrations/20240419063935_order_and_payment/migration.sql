/*
  Warnings:

  - You are about to drop the column `payment_cash` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('CASH', 'CARD', 'REVOLUT', 'SWEDBANK');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('WEB', 'MANUAL');

-- CreateEnum
CREATE TYPE "OrderState" AS ENUM ('NEW', 'PENDING', 'SHIPPING', 'FINISHED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "payment_cash",
ADD COLUMN     "finished_at" TIMESTAMP(3),
ADD COLUMN     "order_state" "OrderState" NOT NULL DEFAULT 'NEW',
ADD COLUMN     "order_type" "OrderType" NOT NULL DEFAULT 'MANUAL',
ADD COLUMN     "payment_recived" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "payment_type" "PaymentType" NOT NULL DEFAULT 'CASH',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderId" INTEGER NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
