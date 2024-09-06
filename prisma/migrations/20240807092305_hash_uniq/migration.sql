/*
  Warnings:

  - A unique constraint covering the columns `[idHash]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_idHash_key" ON "Order"("idHash");
