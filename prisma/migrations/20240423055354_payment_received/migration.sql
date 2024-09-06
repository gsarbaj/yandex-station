/*
  Warnings:

  - You are about to drop the column `payment_recived` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "payment_recived",
ADD COLUMN     "payment_received" INTEGER NOT NULL DEFAULT 0;
